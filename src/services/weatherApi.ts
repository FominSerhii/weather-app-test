import axios from 'axios';

import { WeatherResponse } from '../types/WeatherResponse';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export class CityNotFoundError extends Error {
    constructor(public readonly city: string) {
        super(`City not found: ${city}`);
        this.name = 'CityNotFoundError';
        Object.setPrototypeOf(this, CityNotFoundError.prototype);
    }
}

export const fetchCityWeather = async (
    city: string,
): Promise<WeatherResponse> => {

    const appid = process.env.REACT_APP_OWM_API_KEY ?? 'f00c38e0279b7bc85480c3fe775d518c';
    try {
        const { data } = await axios.get<WeatherResponse>(BASE_URL, {
            params: { q: city, units: 'metric', appid },
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new CityNotFoundError(city);
        }
        throw error;
    }
};