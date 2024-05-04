import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForecastsListComponent } from "./forecasts-list/forecasts-list.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { CacheDurationComponent } from './cache-duration/cache-duration.component';

const appRoutes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'forecast/:zipcode', component: ForecastsListComponent
  },
  {
    path: 'cache-duration', component: CacheDurationComponent
  }
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, {});
