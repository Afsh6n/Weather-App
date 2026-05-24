import { DailyForecast, ForecastResponse } from '../models/forecast.model';

export function toDailyForecasts(response: ForecastResponse, maxDays = 5): DailyForecast[] {
  const byDay = new Map<string, ForecastResponse['list']>();

  for (const entry of response.list) {
    const dayKey = entry.dt_txt.slice(0, 10);
    const group = byDay.get(dayKey) ?? [];
    group.push(entry);
    byDay.set(dayKey, group);
  }

  return [...byDay.entries()].slice(0, maxDays).map(([dayKey, entries]) => {
    const tempMin = Math.min(...entries.map((e) => e.main.temp_min));
    const tempMax = Math.max(...entries.map((e) => e.main.temp_max));
    const midday =
      entries.find((e) => e.dt_txt.includes('12:00:00')) ??
      entries[Math.floor(entries.length / 2)];

    return {
      dayLabel: new Date(`${dayKey}T12:00:00`).toLocaleDateString(undefined, {
        weekday: 'short',
      }),
      icon: midday.weather[0].icon,
      description: midday.weather[0].description,
      tempMin,
      tempMax,
    };
  });
}

export function formatLocalTime(unixUtcSeconds: number, timezoneSeconds: number): string {
  return new Date((unixUtcSeconds + timezoneSeconds) * 1000).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}
