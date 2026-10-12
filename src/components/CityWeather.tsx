import React, { FunctionComponent } from 'react';
import { toDate } from './tools';
import { CityWeatherProps } from '../types/CityWeather';

export const CityWeather: FunctionComponent<CityWeatherProps> = ({ name, country, description, icon, windSpeed, temp }) => (
    <div className="weather-tile">
        <div className="header">
            <h2>{name}, <span>{country}</span></h2>
            <span className="date">{toDate()}</span>
        </div>
        <div className="icon-temp">
            <img
                className=""
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
            />
            {temp.toFixed(1)}
            <sup className="deg">&deg;C</sup>
        </div>
        <div className="des-wind">
            <p>{description.toUpperCase()}</p>
            <p>Wind Speed: {windSpeed}m/s</p>
        </div>
    </div>
)

