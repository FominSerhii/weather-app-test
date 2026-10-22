import React, { FunctionComponent } from 'react';

export const CityWeatherSkeleton: FunctionComponent = () => (
    <div className="weather-tile skeleton" aria-hidden="true">
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line skeleton-temp" />
        <div className="skeleton-line skeleton-text" />
    </div>
);