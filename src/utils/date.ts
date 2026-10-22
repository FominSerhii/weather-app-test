const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
});

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
});

// Adjusts a UTC timestamp by the citys timezone offset
// Formatting in UTC then gives the citys local date and time
const getCityLocalDate = (
    unixTimestamp: number,
    timezoneOffset: number,
): Date => new Date((unixTimestamp + timezoneOffset) * 1000);

export const formatCityDate = (
    unixTimestamp: number,
    timezoneOffset: number,
): string => dateFormatter.format(
    getCityLocalDate(unixTimestamp, timezoneOffset),
);

export const formatCityTime = (
    unixTimestamp: number,
    timezoneOffset: number,
): string => timeFormatter.format(
    getCityLocalDate(unixTimestamp, timezoneOffset),
);