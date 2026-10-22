import { WeatherTheme } from '../types/WeatherTheme';

export const toTheme = (main: string, icon: string): WeatherTheme => {
    const night = icon.endsWith('n');
    switch (main) {
        case 'Clear':
            return night ? 'clear-night' : 'clear-day';
        case 'Clouds':
            return 'clouds';
        case 'Rain':
        case 'Drizzle':
            return 'rain';
        case 'Snow':
            return 'snow';
        case 'Thunderstorm':
            return 'thunderstorm';
        default:
            return 'mist'; // Mist, Fog, Haze, Smoke, Dust, ...
    }
};