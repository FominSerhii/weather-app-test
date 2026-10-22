import { CityWeatherView } from '../types/CityWeather';
import { Units } from '../types/Units';
import { WeatherResponse } from '../types/WeatherResponse';
import { formatCityDate, formatCityTime } from './date';
import { toTheme } from './weatherTheme';


const toFahrenheit = (celsius: number): number =>
    (celsius * 9) / 5 + 32;

const toMph = (metersPerSecond: number): number =>
    Math.round(metersPerSecond * 2.236936 * 10) / 10;

export const toCityWeatherProps = (
    response: WeatherResponse,
    units: Units = 'metric',
): CityWeatherView => {
    const isImperial = units === 'imperial';
    const condition = response.weather[0];

    return {
        id: response.id,
        name: response.name,
        country: response.sys.country,
        description: response.weather[0].description,
        icon: response.weather[0].icon,
        temp: isImperial
            ? toFahrenheit(response.main.temp)
            : response.main.temp,
        windSpeed: isImperial
            ? toMph(response.wind.speed)
            : response.wind.speed,
        tempUnit: isImperial ? '°F' : '°C',
        windUnit: isImperial ? 'mph' : 'm/s',
        feelsLike: isImperial ? toFahrenheit(response.main.feels_like) : response.main.feels_like,
        humidity: response.main.humidity,
        sunrise: formatCityTime(response.sys.sunrise, response.timezone),
        sunset: formatCityTime(response.sys.sunset, response.timezone),
        date: formatCityDate(response.dt, response.timezone),
        time: formatCityTime(response.dt, response.timezone),
        theme: toTheme(condition.main, condition.icon),
    };
};