import axios from 'axios';

import { WeatherResponse } from '../types/WeatherResponse';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchCityWeather = async (
    city: string,
): Promise<WeatherResponse> => {
    const { data } = await axios.get<WeatherResponse>(BASE_URL, {
        params: {
            q: city,
            units: 'metric',
            appid: process.env.REACT_APP_OWM_API_KEY ?? 'f00c38e0279b7bc85480c3fe775d518c',
        },
    });

    return data;
};