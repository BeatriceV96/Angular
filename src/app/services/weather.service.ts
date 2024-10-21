import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '371890d312eb9d6da3952be3995a8a33'; // Inserisci la tua chiave API
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecast5DayUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private geoApiUrl = 'https://api.openweathermap.org/geo/1.0/direct'; // API per i suggerimenti delle città

  constructor(private http: HttpClient) { }

  // Metodo per ottenere il meteo basato sul nome della città
  getWeatherByCity(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=it`);
  }

  // Metodo per ottenere il meteo basato su latitudine e longitudine
  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=it`);
  }

  // Metodo per ottenere i suggerimenti delle città mentre l'utente digita
  getCitySuggestions(query: string): Observable<any> {
    const limit = 5; // Limite dei risultati da mostrare
    return this.http.get(`${this.geoApiUrl}?q=${query}&limit=${limit}&appid=${this.apiKey}`);
  }

  // Metodo per ottenere il meteo combinato con città e nazione
  getWeatherByCityAndCountry(city: string, country: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${city},${country}&appid=${this.apiKey}&units=metric&lang=it`);
  }

  // Metodo per ottenere le previsioni a 5 giorni (ogni 3 ore) basate su latitudine e longitudine
  getFiveDayForecast(lat: number, lon: number): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=it`;
    return this.http.get(url);
  }
}
