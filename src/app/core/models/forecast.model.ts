export interface ForecastResponse {
  list: Array<{
    dt: number;
    main: { temp: number; temp_min: number; temp_max: number };
    weather: Array<{ icon: string; description: string }>;
    dt_txt: string;
  }>;
  city: { name: string; timezone: number };
}

export interface DailyForecast {
  dayLabel: string;
  icon: string;
  description: string;
  tempMin: number;
  tempMax: number;
}
