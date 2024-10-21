import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-app';
  weather : any;

  constructor(private weatherService: WeatherService) {}

  // Questa funzione sarà chiamata ogni volta che i dati meteo vengono emessi dal componente SearchCity
  onWeatherDataReceived(weatherData: any) {
    this.weather = weatherData;  // Assegniamo i dati meteo alla variabile weather
  }

}
