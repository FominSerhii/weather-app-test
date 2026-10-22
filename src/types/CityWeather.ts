export type CityWeatherProps = {
  name: string;
  country: string;
  description: string;
  icon: string;
  windSpeed: number;
  temp: number;
  date: string;
  tempUnit: string; // '°C'|'°F'
  windUnit: string; // 'm/s'|'mph'
  onRemove?: () => void;
};
