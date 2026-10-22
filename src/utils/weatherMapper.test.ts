import { toCityWeatherProps } from './weatherMapper';
import { WeatherResponse } from '../types/WeatherResponse';

const response = {
  id: 1, name: 'Paris', dt: 1700000000, timezone: 3600,
  sys: { country: 'FR', sunrise: 1699947600, sunset: 1699981200 },
  weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
  wind: { speed: 3 },
  main: { temp: 20, feels_like: 18, humidity: 50 },
} as unknown as WeatherResponse;

test('maps the API response in metric units', () => {
  expect(toCityWeatherProps(response)).toMatchObject({
    id: 1, name: 'Paris', country: 'FR',
    temp: 20, feelsLike: 18, humidity: 50, windSpeed: 3,
    tempUnit: '°C', windUnit: 'm/s',
    time: '23:13', sunrise: '08:40', sunset: '18:00',
    date: expect.stringContaining('14 November'),
    theme: 'clear-day',
  });
});

test('converts temperature and wind speed to imperial units', () => {
  const r = toCityWeatherProps(response, 'imperial');
  expect(r.temp).toBeCloseTo(68);
  expect(r.feelsLike).toBeCloseTo(64.4);
  expect(r.windSpeed).toBeCloseTo(6.7);
  expect(r.tempUnit).toBe('°F');
  expect(r.windUnit).toBe('mph');
});