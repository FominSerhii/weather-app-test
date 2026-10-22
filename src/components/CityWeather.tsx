import React, { FunctionComponent } from 'react';

import { CityWeatherProps } from '../types/CityWeather';

export const CityWeather: FunctionComponent<CityWeatherProps> = ({
    name,
    country,
    description,
    icon,
    windSpeed,
    temp,
    date,
}) => (
    <div className="weather-tile">
        <div className="header">
            <h2>
                {name}, <span>{country}</span>
            </h2>
            <span className="date">{date}</span>
        </div>

        <div className="icon-temp">
            <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
            />
            {temp.toFixed(1)}
            <sup className="deg">&deg;C</sup>
        </div>

        <div className="des-wind">
            <p>{description.toUpperCase()}</p>
            <p>Wind Speed: {windSpeed} m/s</p>
        </div>
    </div>
);