import {WeatherResponse} from "./WeatherResponse";

export type  WeatherState = {
    data: WeatherResponse[];
    loading: boolean;
    error: boolean;
}