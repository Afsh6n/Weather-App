import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ForecastResponse } from '../models/forecast.model';
import { WeatherResponse } from '../models/weather.model';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5';

  getWeather(city: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.weatherUrl(city));
  }

  getForecast(city: string): Observable<ForecastResponse> {
    return this.http.get<ForecastResponse>(
      `${this.apiUrl}/forecast?q=${encodeURIComponent(city)}&appid=${environment.weatherApiKey}&units=metric`,
    );
  }

  private weatherUrl(city: string): string {
    return `${this.apiUrl}/weather?q=${encodeURIComponent(city)}&appid=${environment.weatherApiKey}&units=metric`;
  }
}
