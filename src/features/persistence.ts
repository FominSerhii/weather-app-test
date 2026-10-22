import {
    createListenerMiddleware,
    isAnyOf
} from '@reduxjs/toolkit';
import { WeatherState } from '../types/WeatherState';
import {
    cityRemoved,
    fetchWeather,
    unitsChanged
} from './weatherSlice';
import {
    saveCities,
    saveUnits
} from '../utils/storage';

type Slice = { weather: WeatherState };

export const createPersistenceMiddleware = () => {
    const listener = createListenerMiddleware();

    listener.startListening({
        matcher: isAnyOf(fetchWeather.fulfilled, cityRemoved),
        effect: (_action, api) => {
            const { weather } = api.getState() as Slice;
            saveCities(weather.data.map((c) => c.name));
        },
    });

    listener.startListening({
        actionCreator: unitsChanged,
        effect: (action) => saveUnits(action.payload),
    });

    return listener.middleware;
};