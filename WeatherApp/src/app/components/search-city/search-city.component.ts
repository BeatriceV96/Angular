import { Component, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent {
  city: string = '';  // Nome della città inserito dall'utente
  citySuggestions: any[] = [];  // Array per i suggerimenti delle città
  @Output() weatherData = new EventEmitter<any>();  // Emissione dei dati meteo
  country: string = '';  // Nazionalità
  state: string = '';  // Regione

  constructor(private weatherService: WeatherService) {}

  // Funzione per cercare il meteo in base al nome della città
  searchWeather() {
    if (this.city) {
      this.weatherService.getWeatherByCity(this.city).subscribe(
        data => {
          this.weatherData.emit(data);
          this.country = data.sys.country; // Ottieni la nazione
          this.state = data.name; // Ottieni la regione
        },
        error => console.error('Errore nel recupero dei dati meteo', error)
      );
    } else {
      console.error('Inserisci un nome città valido');
    }
  }

  // Funzione per cercare suggerimenti delle città mentre l'utente digita
  onCityInput(event: any) {
    const inputValue = event.target.value;
    if (inputValue.length > 0) {
      // Fai una chiamata al tuo servizio per ottenere suggerimenti basati sull'input dell'utente
      this.weatherService.getCitySuggestions(inputValue).subscribe(
        suggestions => {
          this.citySuggestions = suggestions;
        },
        error => {
          console.error('Errore nel recupero dei suggerimenti di città', error);
        }
      );
    } else {
      this.citySuggestions = [];
    }
  }
  // Funzione per selezionare una città dai suggerimenti
  selectCity(suggestion: any) {
    this.city = suggestion.name; // Imposta il nome della città selezionata
    const country = suggestion.country; // Imposta il codice del paese (ad esempio, 'IT' o 'US')

    // Cerca il meteo per la città selezionata e il paese
    this.weatherService.getWeatherByCityAndCountry(this.city, country).subscribe(
      data => this.weatherData.emit(data),
      error => console.error('Errore nel recupero dei dati meteo', error)
    );

    this.citySuggestions = []; // Nasconde i suggerimenti dopo la selezione
  }

}
