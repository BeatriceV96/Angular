import { Component, Input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.scss']
})
export class WeatherResultComponent {
  @Input() weatherData: any;
  @Input() hourlyWeather: any[] = []; // Holds the forecast data
  weeklyWeather: any[] = []; // Holds the weekly forecast data
  fiveDayForecast: any[] = []; // Definisco la proprietà per le previsioni a 5 giorni


  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    if (this.weatherData) {
      const lat = this.weatherData.coord.lat;
      const lon = this.weatherData.coord.lon;

      // Chiamata al servizio per ottenere le previsioni a 5 giorni
      this.weatherService.getFiveDayForecast(lat, lon).subscribe(
        (data) => {
          this.fiveDayForecast = data.list; // Mappa i dati nel componente
        },
        (error) => {
          console.error('Errore nel recupero delle previsioni', error);
        }
      );
    }
  }


  getTranslatedWeather(description: string): string {
    const weatherTranslations: { [key: string]: string } = {
      'clear sky': 'cielo sereno',
      'few clouds': 'poche nuvole',
      'scattered clouds': 'nuvole sparse',
      'broken clouds': 'nuvole rotte',
      'shower rain': 'pioggia a rovesci',
      'rain': 'pioggia',
      'thunderstorm': 'temporale',
      'snow': 'neve',
      'mist': 'nebbia',
    };
    return weatherTranslations[description] || description;
  }

  // Fetch forecast after receiving current weather
  onWeatherDataReceived(data: any) {
    this.weatherData = data;
    const lat = this.weatherData.coord.lat;
    const lon = this.weatherData.coord.lon;

    // Fetch 4-day forecast
    this.weatherService.getFiveDayForecast(41.9028, 12.4964).subscribe(
      (data) => {
        console.log(data); // Questo mostrerà i dati per i prossimi 5 giorni
      },
      (error) => {
        console.error('Errore nel recupero delle previsioni', error);
      }
    );
  }

  groupForecastByDay() {
    const grouped = this.fiveDayForecast.reduce((acc, forecast) => {
      const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString('it-IT');
      if (!acc[forecastDate]) {
        acc[forecastDate] = [];
      }
      acc[forecastDate].push(forecast);
      return acc;
    }, {});
    return Object.keys(grouped).map(date => ({ date, forecasts: grouped[date] }));
  }

}
