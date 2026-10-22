import { toTheme } from './weatherTheme';

test('splits clear weather into day and night', () => {
    expect(toTheme('Clear', '01d')).toBe('clear-day');
    expect(toTheme('Clear', '01n')).toBe('clear-night');
});

test('groups related conditions', () => {
    expect(toTheme('Drizzle', '09d')).toBe('rain');
    expect(toTheme('Rain', '10n')).toBe('rain');
    expect(toTheme('Thunderstorm', '11d')).toBe('thunderstorm');
});

test('falls back to mist for atmosphere conditions', () => {
    expect(toTheme('Fog', '50d')).toBe('mist');
    expect(toTheme('Haze', '50n')).toBe('mist');
});