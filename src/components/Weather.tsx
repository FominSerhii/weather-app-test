import React, { FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { WeatherResponse } from '../types/WeatherResponse';
import { CityWeather } from './CityWeather';
import { toDate } from './tools';
import {useDispatch, useSelector} from "react-redux";
import {WeatherDispatch, WeatherRootState} from "../features/store";
import {fetchWeather} from "../features/weatherSlice";

const Weather: FunctionComponent = () => {
  const [query, setQuery] = useState('');

    const dispatch = useDispatch<WeatherDispatch>();
    const { data, loading, error } = useSelector((state: WeatherRootState) => state.weather);
    const search = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!query.trim()) return;
            dispatch(fetchWeather(query));
            setQuery('');
        }
    };


  return (
    <div>
      <h1 className="app-name">
        Weather App<span>🌤</span>
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Search City.."
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={search}
        />
      </div>

      {loading && (
        <>
          <br />
          <br />
          <InfinitySpin width='100px' />
        </>
      )}
      {error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: '20px' }}> Sorry, City not found</span>
          </span>
        </>
      )}

      {data && data.map((cityData:WeatherResponse, index:number) =>(
          <CityWeather name={cityData.name} country={cityData.sys.country} description={cityData.weather[0].description} icon={cityData.weather[0].icon} windSpeed={cityData.wind.speed} temp={cityData.main.temp}/>
      ))}
    </div>
  );
}

export default Weather;
