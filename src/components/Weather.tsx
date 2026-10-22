
import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { InfinitySpin } from 'react-loader-spinner';

import {
  useAppDispatch,
  useAppSelector,
} from '../features/hooks';
import {
  fetchWeather,
  selectCities,
  selectFailed,
  selectLoading,
} from '../features/weatherSlice';

import { toDate } from '../utils/date';
import { CityWeather } from './CityWeather';
import { SearchBar } from './SearchBar';

const Weather: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectCities);
  const failed = useAppSelector(selectFailed);
  const loading = useAppSelector(selectLoading);
  const today = toDate();

  return (
    <div>
      <h1 className="app-name">
        Weather App<span>🌤</span>
      </h1>

      <SearchBar onSearch={(query) => dispatch(fetchWeather(query))} />

      {loading && (
        <>
          <br />
          <br />
          <InfinitySpin width="100px" />
        </>
      )}

      {failed.map((city) => (
        <span className="error-message" key={city}>
          <FontAwesomeIcon icon={faFrown} />
          <span style={{ fontSize: '20px' }}>
            Sorry, {city} not found
          </span>
        </span>
      ))}

      {cities.map((city) => (
        <CityWeather key={city.id} {...city} date={today} />
      ))}
    </div>
  );
};

export default Weather;
