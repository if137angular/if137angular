export type WeatherDataModel = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: DailyModel[];
};

export type DailyModel = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: TemperatureModel;
  feels_like: FeelsLikeModel;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherModel[];
  clouds: number;
  pop: number;
  uvi: number;
};

export type TemperatureModel = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

export type FeelsLikeModel = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

export type WeatherModel = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
