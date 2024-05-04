import { Injectable, WritableSignal, signal } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {
  private locations : WritableSignal<string[]> = signal<string[]>([]);
  readonly addedLocation$: Subject<string> = new ReplaySubject<string>();
  readonly removedLocation$: Subject<string> = new Subject<string>();

  constructor() {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations.set(JSON.parse(locString));
     for (let loc of this.locations()){
       this.addedLocation$.next(loc);
     }
  }

  addLocation(zipcode : string) {
    // Avoiding duplicates
    const index = this.locations().indexOf(zipcode);
    if(index === -1){
      // we can added the zipcode (not exist)
      this.locations.update(currentLocations => [... currentLocations, zipcode]);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations()));
      this.addedLocation$.next(zipcode);
    }
  }

  removeLocation(zipcode : string) {
    this.locations.update(currentLocations => {
      const index = currentLocations.indexOf(zipcode);
      if (index !== -1) {
        const newLocations =  [...currentLocations.slice(0, index),
           ... currentLocations.slice(index + 1, currentLocations.length)];
           localStorage.setItem(LOCATIONS, JSON.stringify(newLocations));
           this.removedLocation$.next(zipcode);
           return newLocations;
      } else {
        return [...currentLocations];
      }
    });
  }
}
