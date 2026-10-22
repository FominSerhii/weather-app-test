import { Units } from '../types/Units';

const UNITS_KEY = 'weather-app:units';
const CITIES_KEY = 'weather-app:cities';

export const loadUnits = (): Units => {
    try {
        return localStorage.getItem(UNITS_KEY) === 'imperial' ? 'imperial' : 'metric';
    } catch {
        return 'metric'; // storage unavailable
    }
};

export const saveUnits = (units: Units): void => {
    try {
        localStorage.setItem(UNITS_KEY, units);
    } catch {
        // storage unavailable
    }
};

export const loadCities = (): string[] => {
    try {
        const parsed: unknown = JSON.parse(localStorage.getItem(CITIES_KEY) ?? '[]');
        return Array.isArray(parsed) ? parsed.filter((c): c is string => typeof c === 'string') : [];
    } catch {
        return [];
    }
};

export const saveCities = (cities: string[]): void => {
    try {
        localStorage.setItem(CITIES_KEY, JSON.stringify(cities));
    } catch {
        // storage unavailable
    }
};