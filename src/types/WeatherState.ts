import { WeatherResponse } from "./WeatherResponse";

export type WeatherState = {
    data: WeatherResponse[];
    loading: boolean;
    failed: string[]; // cities that could not be loaded
    error: string | null;
    pendingCount: number; // how many cities are being fetched right now
}