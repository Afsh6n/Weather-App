import { Component } from '@angular/core';
import { WeatherComponent } from './features/weather/weather.component';

@Component({
  selector: 'app-root',
  imports: [WeatherComponent],
  template: '<app-weather />',
})
export class App {}
