import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {WeatherResponse} from "../types/WeatherResponse";
import {WeatherState} from "../types/WeatherState";


const initialState: WeatherState = {
    data: [],
    loading: false,
    error: false,
};

// axios call
export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (citiesQuery: string) => {
        const cities = citiesQuery.split(',').map((c) => c.trim()).filter(Boolean);
        if (cities.length === 0) return [];

        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const appid = 'f00c38e0279b7bc85480c3fe775d518c';

        const requests = cities.map((city) =>
            axios.get(url, {
                params: {
                    q: city,
                    units: 'metric',
                    appid: appid,
                }
            })
        );

        const responses = await Promise.all(requests);
        return responses.map((res) => res.data); // Returns WeatherResponse[]
    }
);

// state transitions
const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherResponse[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchWeather.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.data = [];
            });
    },
});

export default weatherSlice.reducer;