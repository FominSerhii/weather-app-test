export const toDate = (date: Date = new Date()): string =>
    new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    }).format(date);