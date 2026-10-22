import { combineReducers, configureStore } from '@reduxjs/toolkit';
import weatherReducer, { fetchWeather, initialState } from './weatherSlice';
import { createPersistenceMiddleware } from './persistence';
import { loadCities, loadUnits } from '../utils/storage';

const rootReducer = combineReducers({ weather: weatherReducer });

export type WeatherRootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<WeatherRootState>) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefault) => getDefault().prepend(createPersistenceMiddleware()),
    });

export type WeatherStore = ReturnType<typeof setupStore>;
export type WeatherDispatch = WeatherStore['dispatch'];

export const store = setupStore({
    weather: { ...initialState, units: loadUnits() },
});

// Refetch the cities saved in the previous session
export const restoreSession = (target: WeatherStore = store): void => {
    const saved = loadCities();
    if (saved.length > 0) {
        target.dispatch(fetchWeather(saved.join(',')));
    }
};