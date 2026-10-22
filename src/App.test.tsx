import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';
import { fetchCityWeather } from './services/weatherApi';
import { WeatherResponse } from './types/WeatherResponse';

jest.mock('./services/weatherApi', () => ({
  fetchCityWeather: jest.fn(),
}));

const fake = (name: string, id: number) =>
  ({
    id,
    name,
    sys: { country: 'XX' },
    weather: [
      {
        description: 'clear sky',
        icon: '01d',
      },
    ],
    wind: { speed: 3 },
    main: { temp: 20 },
  }) as unknown as WeatherResponse;

test('shows a tile per comma-separated city and reports unknown ones', async () => {
  (fetchCityWeather as jest.Mock).mockImplementation(
    async (city: string) => {
      if (city === 'Nowhere') {
        throw new Error('404');
      }

      return fake(city, city.length);
    },
  );

  render(<App />);

  const input = screen.getByPlaceholderText(/search city/i);

  fireEvent.change(input, {
    target: { value: 'Paris, Berlin, Nowhere' },
  });

  fireEvent.keyDown(input, { key: 'Enter' });

  expect(await screen.findByText(/Paris/)).toBeInTheDocument();
  expect(screen.getByText(/Berlin/)).toBeInTheDocument();
  expect(
    screen.getByText(/couldn't find "Nowhere"/),
  ).toBeInTheDocument();
});
