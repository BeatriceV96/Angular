import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchCityComponent } from './components/search-city/search-city.component';
import { WeatherResultComponent } from './components/weather-result/weather-result.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

// Importa il locale italiano
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

// Registra i dati di localizzazione per l'italiano
registerLocaleData(localeIt, 'it');

@NgModule({
  declarations: [
    AppComponent,
    SearchCityComponent,
    WeatherResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'it' }  // Imposta l'ID del locale come 'it' (italiano)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
