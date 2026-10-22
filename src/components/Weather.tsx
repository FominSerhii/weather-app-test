import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';

import { UnitToggle } from './UnitToggle';
import {
  useAppDispatch,
  useAppSelector,
} from '../features/hooks';
import {
  fetchWeather,
  selectCities,
  selectFailed,
  selectLoading,
  selectError,
  selectPendingCount,
  cityRemoved,
  selectUnits,
  unitsChanged
} from '../features/weatherSlice';

import { toDate } from '../utils/date';
import { CityWeather } from './CityWeather';
import { SearchBar } from './SearchBar';
import { CityWeatherSkeleton } from './CityWeatherSkeleton';
import { EmptyState } from './EmptyState';

const MAX_SKELETONS = 5;
const Weather: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectCities);
  const failed = useAppSelector(selectFailed);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const pendingCount = useAppSelector(selectPendingCount);
  const units = useAppSelector(selectUnits);
  const today = toDate();

  const search = (query: string) => {
    dispatch(fetchWeather(query));
  };

  const isEmpty =
    !loading &&
    !error &&
    cities.length === 0 &&
    failed.length === 0;

  return (
    <div>
      <h1 className="app-name">
        Weather App<span aria-hidden="true">🌤</span>
      </h1>

      <SearchBar onSearch={search} />
      <UnitToggle units={units} onChange={(u) => dispatch(unitsChanged(u))} />
      {isEmpty && <EmptyState onTry={search} />}

      <div aria-live="polite" aria-busy={loading}>
        {loading && (
          <>
            <p className="visually-hidden">Loading weather…</p>

            {Array.from(
              {
                length: Math.min(
                  pendingCount,
                  MAX_SKELETONS,
                ),
              },
              (_, index) => (
                <CityWeatherSkeleton key={index} />
              ),
            )}
          </>
        )}

        {error && (
          <span className="error-message" role="alert">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: '20px' }}>
              {' '}
              {error}
            </span>
          </span>
        )}

        {failed.map((city) => (
          <span
            className="error-message"
            role="alert"
            key={city}
          >
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: '20px' }}>
              {' '}
              Sorry, {city} not found
            </span>
          </span>
        ))}

        {cities.map((city) => (
          <CityWeather
            key={city.id}
            {...city}
            date={today}
            onRemove={() => dispatch(cityRemoved(city.id))}
          />
        ))}
      </div>
    </div>
  );
};

export default Weather;