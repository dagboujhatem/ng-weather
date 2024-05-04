import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCacheService } from 'app/http-cache.service';
import { LocationService } from 'app/location.service';

@Component({
  selector: 'app-cache-duration',
  templateUrl: './cache-duration.component.html',
  styleUrl: './cache-duration.component.css'
})
export class CacheDurationComponent {
  private router = inject(Router);
  public httpCacheService = inject(HttpCacheService);

  saveCacheDuration(duration: number){
    this.httpCacheService.setCacheDuration(duration);
    this.router.navigateByUrl("/");
  }

}
