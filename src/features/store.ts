import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
});

export type WeatherRootState = ReturnType<typeof store.getState>;
export type WeatherDispatch = typeof store.dispatch;