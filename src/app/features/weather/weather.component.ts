import { DecimalPipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DailyForecast } from '../../core/models/forecast.model';
import { WeatherResponse } from '../../core/models/weather.model';
import { WeatherService } from '../../core/services/weather.service';
import { formatLocalTime, toDailyForecasts } from '../../core/utils/forecast.util';

@Component({
  selector: 'app-weather',
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './weather.component.html',
})
export class WeatherComponent {
  private readonly fb = inject(FormBuilder);
  private readonly weatherService = inject(WeatherService);
  private readonly destroyRef = inject(DestroyRef);

  readonly weatherForm = this.fb.nonNullable.group({
    city: ['', [Validators.required, Validators.minLength(2)]],
  });

  readonly weatherData = signal<WeatherResponse | null>(null);
  readonly forecastDays = signal<DailyForecast[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  readonly temperatureEmoji = computed(() => {
    const temp = this.weatherData()?.main.temp;
    if (temp == null) return '';
    if (temp < -10) return '🥶';
    if (temp < 0) return '❄️';
    if (temp < 10) return '🌨️';
    if (temp < 20) return '🌤️';
    if (temp < 30) return '☀️';
    if (temp < 40) return '🌡️';
    return '🔥';
  });

  readonly humidityEmoji = computed(() => {
    const humidity = this.weatherData()?.main.humidity;
    if (humidity == null) return '';
    if (humidity < 20) return '🏜️';
    if (humidity < 40) return '🌵';
    if (humidity < 60) return '💧';
    if (humidity < 80) return '💦';
    return '🌊';
  });

  readonly weatherIconUrl = computed(() => {
    const icon = this.weatherData()?.weather[0]?.icon;
    return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null;
  });

  readonly sunTimes = computed(() => {
    const data = this.weatherData();
    if (!data) return null;
    return {
      sunrise: formatLocalTime(data.sys.sunrise, data.timezone),
      sunset: formatLocalTime(data.sys.sunset, data.timezone),
    };
  });

  forecastIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}.png`;
  }

  getWeather(): void {
    const city = this.weatherForm.controls.city.value.trim();
    if (!city || this.weatherForm.invalid) {
      this.weatherForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.weatherData.set(null);
    this.forecastDays.set([]);

    forkJoin({
      current: this.weatherService.getWeather(city),
      forecast: this.weatherService.getForecast(city).pipe(catchError(() => of(null))),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ current, forecast }) => {
          this.weatherData.set(current);
          this.forecastDays.set(forecast ? toDailyForecasts(forecast) : []);
          this.isLoading.set(false);
        },
        error: (error: { status?: number }) => {
          this.errorMessage.set(this.resolveErrorMessage(error.status));
          this.isLoading.set(false);
        },
      });
  }

  clearSearch(): void {
    this.weatherForm.reset();
    this.weatherData.set(null);
    this.forecastDays.set([]);
    this.errorMessage.set('');
  }

  private resolveErrorMessage(status?: number): string {
    switch (status) {
      case 404:
        return 'City not found. Check the name and try again.';
      case 401:
        return 'API authentication failed. Check your API key.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 0:
        return 'Network error. Check your internet connection.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return 'Could not fetch weather data. Please try again.';
    }
  }
}
