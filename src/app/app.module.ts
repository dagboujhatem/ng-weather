import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ZipcodeEntryComponent } from './zipcode-entry/zipcode-entry.component';
import { LocationService } from "./location.service";
import { HttpCacheService } from "./http-cache.service";
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { WeatherService } from "./weather.service";
import { CurrentConditionsComponent } from './current-conditions/current-conditions.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from "@angular/router";
import { routing } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CacheDurationComponent } from './cache-duration/cache-duration.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { TabGroupContentDirective } from './tab-group-content.directive';
import { TabGroupHeaderDirective } from './tab-group-header.directive';

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    MainPageComponent,
    CacheDurationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TabViewComponent,
    TabGroupHeaderDirective,
    TabGroupContentDirective,
    RouterModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [LocationService, WeatherService, HttpCacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
