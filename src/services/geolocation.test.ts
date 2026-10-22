import { GeolocationError, getCurrentCoordinates } from './geolocation';

const mockGeolocation = (value: unknown) =>
    Object.defineProperty(global.navigator, 'geolocation', { value, configurable: true });

afterEach(() => mockGeolocation(undefined));

test('resolves with coordinates', async () => {
    mockGeolocation({
        getCurrentPosition: (ok: PositionCallback) =>
            ok({ coords: { latitude: 48.15, longitude: 17.11 } } as GeolocationPosition),
    });

    await expect(getCurrentCoordinates()).resolves.toEqual({ lat: 48.15, lon: 17.11 });
});

test.each([
    [1, 'denied'],
    [2, 'unavailable'],
    [3, 'timeout'],
])('maps error code %i to "%s"', async (code, reason) => {
    mockGeolocation({
        getCurrentPosition: (_ok: PositionCallback, fail: PositionErrorCallback) =>
            fail({ code } as GeolocationPositionError),
    });

    await expect(getCurrentCoordinates()).rejects.toMatchObject({
        name: 'GeolocationError',
        reason,
    });
});

test('rejects when the browser has no geolocation support', async () => {
    mockGeolocation(undefined);
    await expect(getCurrentCoordinates()).rejects.toBeInstanceOf(GeolocationError);
});