import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';

import { WeatherState } from '../types/WeatherState';
import { WeatherResponse } from '../types/WeatherResponse';

import { parseCities } from '../utils/parseCities';
import { toCityWeatherProps } from '../utils/weatherMapper';

import { fetchCityWeather, CityNotFoundError } from '../services/weatherApi';

const initialState: WeatherState = {
    data: [],
    loading: false,
    failed: [],
    error: null,
    pendingCount: 0
};

type FetchResult = { data: WeatherResponse[]; failed: string[] };

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

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
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
            });
    },
});

export default weatherSlice.reducer;

// selectors
type Slice = { weather: WeatherState };

export const selectLoading = (s: Slice) => s.weather.loading;
export const selectFailed = (s: Slice) => s.weather.failed;
export const selectError = (s: Slice) => s.weather.error;
export const selectPendingCount = (s: Slice) => s.weather.pendingCount;
export const selectCities = createSelector(
    (s: Slice) => s.weather.data,
    (data) => data.map(toCityWeatherProps)
);