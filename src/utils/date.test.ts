import { formatCityDate, formatCityTime } from './date';

const DT = 1700000000;

test('formats the time in the city timezone', () => {
    expect(formatCityTime(DT, 0)).toBe('22:13');
    expect(formatCityTime(DT, 3600)).toBe('23:13');
    expect(formatCityTime(DT, -18000)).toBe('17:13');
});

test('rolls the date over for timezones ahead of UTC', () => {
    expect(formatCityDate(DT, 0)).toContain('14 November');
    expect(formatCityDate(DT, 7200)).toContain('15 November');
});