import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Weather from './components/Weather';
import { restoreSession, setupStore } from './features/store';
import { CityNotFoundError, fetchCityWeather } from './services/weatherApi';
import { WeatherResponse } from './types/WeatherResponse';

jest.mock('./services/weatherApi', () => ({
  ...jest.requireActual('./services/weatherApi'),
  fetchCityWeather: jest.fn(),
}));

const fake = (name: string, id: number) =>
({
  id,
  name,
  dt: 1700000000,
  timezone: 3600,
  sys: { country: 'XX' },
  weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
  wind: { speed: 3 },
  main: { temp: 20 }
} as unknown as WeatherResponse);

const renderWeather = (store = setupStore()) =>
  render(<Provider store={store}><Weather /></Provider>);

const search = (value: string) => {
  const input = screen.getByPlaceholderText(/search city/i);
  fireEvent.change(input, { target: { value } });
  fireEvent.keyDown(input, { key: 'Enter' });
};

beforeEach(() => {
  localStorage.clear();
  (fetchCityWeather as jest.Mock).mockImplementation(async (city: string) => {
    if (city === 'Nowhere') throw new CityNotFoundError(city);
    return fake(city, city.length);
  });
});

test('shows a tile per comma-separated city and reports unknown ones', async () => {
  renderWeather();
  search('Paris, Berlin, Nowhere');

  expect(await screen.findByText(/Paris/)).toBeInTheDocument();
  expect(screen.getByText(/Berlin/)).toBeInTheDocument();
  expect(screen.getByText(/Sorry, Nowhere not found/)).toBeInTheDocument();
});

test('shows a hint before the first search and loads the example on click', async () => {
  renderWeather();
  fireEvent.click(screen.getByRole('button', { name: /try:/i }));

  expect(await screen.findAllByRole('heading', { level: 2 })).toHaveLength(3);
  expect(screen.queryByRole('button', { name: /try:/i })).not.toBeInTheDocument();
});

test('removes a single tile', async () => {
  renderWeather();
  search('Paris, Berlin');
  await screen.findByText(/Paris/);

  fireEvent.click(screen.getByRole('button', { name: /remove paris/i }));

  expect(screen.queryByText(/Paris/)).not.toBeInTheDocument();
  expect(screen.getByText(/Berlin/)).toBeInTheDocument();
});

test('switches to Fahrenheit and saves the choice', async () => {
  renderWeather();
  search('Paris');
  await screen.findByText(/Paris/);
  expect(screen.getByText(/20\.0/)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Fahrenheit' }));

  expect(screen.getByText(/68\.0/)).toBeInTheDocument();
  expect(localStorage.getItem('weather-app:units')).toBe('imperial');
});

test('saves searched cities and restores them on startup', async () => {
  const first = renderWeather();
  search('Paris, Berlin');
  await screen.findByText(/Paris/);
  expect(JSON.parse(localStorage.getItem('weather-app:cities')!)).toEqual(['Paris', 'Berlin']);
  first.unmount();

  const store = setupStore();
  restoreSession(store);
  renderWeather(store);

  expect(await screen.findByText(/Paris/)).toBeInTheDocument();
  expect(screen.getByText(/Berlin/)).toBeInTheDocument();
});

test('shows local time, details and a weather theme on the tile', async () => {
  const { container } = renderWeather();
  search('Paris');
  await screen.findByText(/Paris/);

  expect(screen.getByText(/23:13/)).toBeInTheDocument(); // dt 22:13 UTC + 1h
  expect(screen.getByText('50%')).toBeInTheDocument();
  expect(screen.getByText('08:40')).toBeInTheDocument(); // sunrise
  expect(screen.getByText('18:00')).toBeInTheDocument(); // sunset
  expect(container.querySelector('.weather-tile')).toHaveClass('theme-clear-day');
});