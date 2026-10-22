import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';

import { WeatherState } from '../types/WeatherState';
import { WeatherResponse } from '../types/WeatherResponse';

import { parseCities } from '../utils/parseCities';
import { toCityWeatherProps } from '../utils/weatherMapper';

import { fetchCityWeather } from '../services/weatherApi';

const initialState: WeatherState = {
    data: [],
    loading: false,
    failed: []
};

type FetchResult = { data: WeatherResponse[]; failed: string[] };

export const fetchWeather = createAsyncThunk<FetchResult, string>(
    'weather/fetchWeather',
    async (query) => {
        const cities = parseCities(query);
        const results = await Promise.allSettled(cities.map(fetchCityWeather));

        const data: WeatherResponse[] = [];
        const failed: string[] = [];
        results.forEach((r, i) =>
            r.status === 'fulfilled' ? data.push(r.value) : failed.push(cities[i])
        );
        return { data, failed };
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.failed = [];
            })
            .addCase(fetchWeather.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload.data;
                state.failed = payload.failed;
            })
            .addCase(fetchWeather.rejected, (state) => {
                state.loading = false;
                state.data = [];
            });
    },
});

export default weatherSlice.reducer;

// selectors
type Slice = { weather: WeatherState };
export const selectLoading = (s: Slice) => s.weather.loading;
export const selectFailed = (s: Slice) => s.weather.failed;
export const selectCities = createSelector(
    (s: Slice) => s.weather.data,
    (data) => data.map(toCityWeatherProps)
);