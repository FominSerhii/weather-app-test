import { WeatherResponse } from '../types/WeatherResponse';
import { CityWeatherProps } from '../types/CityWeather';

export const toCityWeatherProps = (r: WeatherResponse): Omit<CityWeatherProps, 'date'> & { id: number } => ({
    id: r.id,
    name: r.name,
    country: r.sys.country,
    description: r.weather[0].description,
    icon: r.weather[0].icon,
    windSpeed: r.wind.speed,
    temp: r.main.temp,
});