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
    time,
    tempUnit,
    windUnit,
    feelsLike,
    humidity,
    sunrise,
    sunset,
    theme,
    onRemove,
}) => (
    <div className={`weather-tile theme-${theme}`}>
        {onRemove && (
            <button
                type="button"
                className="remove-btn"
                aria-label={`Remove ${name}`}
                onClick={onRemove}>
                <p style={{ margin: 0, marginBottom: `2px` }}>×</p>
            </button>
        )}
        <div className="header">
            <h2>
                {name}, <span>{country}</span>
            </h2>
            <span className="date">{date}, {time}</span>
        </div>

        <div className="icon-temp">
            <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt=""
            />
            {temp.toFixed(1)}
            <sup className="deg">{tempUnit}</sup>
        </div>

        <div className="des-wind">
            <p>{description.toUpperCase()}</p>
            <p>Wind Speed: {windSpeed} {windUnit}</p>
        </div>
        <dl className="details">
            <div>
                <dt>Feels like</dt>
                <dd>{feelsLike.toFixed(1)}{tempUnit}</dd>
            </div>
            <div>
                <dt>Humidity</dt>
                <dd>{humidity}%</dd>
            </div>
            <div>
                <dt>Sunrise</dt>
                <dd>{sunrise}</dd>
            </div>
            <div>
                <dt>Sunset</dt>
                <dd>{sunset}</dd>
            </div>
        </dl>
    </div>
);