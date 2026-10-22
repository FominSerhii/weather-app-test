import {
    createAsyncThunk,
    createSelector,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';

import { Units } from '../types/Units';
import { WeatherState } from '../types/WeatherState';
import { WeatherResponse } from '../types/WeatherResponse';

import { parseCities } from '../utils/parseCities';
import { toCityWeatherProps } from '../utils/weatherMapper';

import {
    fetchCityWeather,
    CityNotFoundError,
    fetchWeatherByCoords
} from '../services/weatherApi';
import {
    GEOLOCATION_MESSAGES,
    GeolocationError,
    getCurrentCoordinates,
} from '../services/geolocation';

export const initialState: WeatherState = {
    data: [],
    loading: false,
    failed: [],
    error: null,
    pendingCount: 0,
    units: 'metric',
};

type FetchResult = { data: WeatherResponse[]; failed: string[] };
const SERVICE_ERROR = 'Weather service error. Check your API key or connection.';

export const fetchWeather = createAsyncThunk<FetchResult, string, { rejectValue: string }>(
    'weather/fetchWeather',
    async (query, { rejectWithValue }) => {
        const cities = parseCities(query);
        const results = await Promise.allSettled(cities.map(fetchCityWeather));

        const data: WeatherResponse[] = [];
        const failed: string[] = [];
        for (let i = 0; i < results.length; i++) {
            const r = results[i];
            if (r.status === 'fulfilled') {
                data.push(r.value);
            } else if (r.reason instanceof CityNotFoundError) {
                failed.push(cities[i]);
            } else {
                return rejectWithValue('Weather service error. Check your API key or connection.');
            }
        }
        return { data, failed };
    }
);

export const fetchWeatherByLocation = createAsyncThunk<WeatherResponse, void, { rejectValue: string }>(
    'weather/fetchWeatherByLocation',
    async (_, { rejectWithValue }) => {
        try {
            const coordinates = await getCurrentCoordinates();
            return await fetchWeatherByCoords(coordinates);
        } catch (e) {
            if (e instanceof GeolocationError) {
                return rejectWithValue(GEOLOCATION_MESSAGES[e.reason]);
            }
            return rejectWithValue(SERVICE_ERROR);
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        cityRemoved(state, action: PayloadAction<number>) {
            state.data = state.data.filter((c) => c.id !== action.payload);
        },
        unitsChanged(state, action: PayloadAction<Units>) {
            state.units = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state, action) => {
                state.loading = true;
                state.failed = [];
                state.error = null;
                state.pendingCount = parseCities(action.meta.arg).length;
            })
            .addCase(fetchWeather.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload.data;
                state.failed = payload.failed;
                state.pendingCount = 0;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.pendingCount = 0;
                state.error = action.payload ?? 'Unexpected error';
            })
            .addCase(fetchWeatherByLocation.pending, (state) => {
                state.loading = true;
                state.failed = [];
                state.error = null;
                state.pendingCount = 1;
            })
            .addCase(fetchWeatherByLocation.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = [payload];
                state.failed = [];
                state.pendingCount = 0;
            })
            .addCase(fetchWeatherByLocation.rejected, (state, action) => {
                state.loading = false;
                state.pendingCount = 0;
                state.error = action.payload ?? 'Unexpected error';
            });
    },
});

export default weatherSlice.reducer;

// selectors
type Slice = { weather: WeatherState };

export const selectUnits = (s: Slice) => s.weather.units;
export const selectLoading = (s: Slice) => s.weather.loading;
export const selectFailed = (s: Slice) => s.weather.failed;
export const selectError = (s: Slice) => s.weather.error;
export const selectPendingCount = (s: Slice) => s.weather.pendingCount;
export const selectCities = createSelector(
    [
        (state: Slice) => state.weather.data,
        (state: Slice) => state.weather.units,
    ],
    (weatherData, units) =>
        weatherData.map((response) =>
            toCityWeatherProps(response, units),
        ),
);
export const { cityRemoved, unitsChanged } = weatherSlice.actions;