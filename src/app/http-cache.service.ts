import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
export const CACHE_REQUESTS: string = "cache-requests";
export const CACHE_DURATION : string = "cache-duration";

interface CacheRequestItem {
  url: string;
  date: Date;
  response: unknown;
}

@Injectable()
export class HttpCacheService {
  private readonly cacheRequests: CacheRequestItem[] = [];
  private cacheDuration: WritableSignal<number> = signal<number>(null);

  constructor(private readonly httpClient: HttpClient) {
    // load cache duration
    let durationString = localStorage.getItem(CACHE_DURATION);
    if (durationString) {
      this.cacheDuration.set(JSON.parse(durationString));
    } else {
      this.cacheDuration.set(7200); // 7200 Seconds means the default value is 2 hours
    }
    // load cache requests
    let cacheRequestsString = localStorage.getItem(CACHE_REQUESTS);
    if (cacheRequestsString) {
      this.cacheRequests = JSON.parse(cacheRequestsString);
    } else {
      this.cacheRequests = [];
    }
  }

  get<T>(...params: Parameters<typeof this.httpClient.get>): ReturnType<typeof this.httpClient.get<T>> {
    // The url is first element
    const url = params[0];
    if (!this.isExistRequestInCache(url) || this.isExpiredRequestDate(url)) {
      return this.httpClient.get<T>(...params).pipe(
        tap((data) => {
          this.saveReponseItem(url, data);
        }),
      );
    }
    return of(this.getResponseItem(url));
  }

  private isExistRequestInCache(url: string) {
    const index = this.cacheRequests.findIndex(cache => cache.url == url);
    return index !== -1;
  }

  private isExpiredRequestDate(url: string) {
    const index = this.cacheRequests.findIndex(cache => cache.url == url);
    if (index !== -1) {
      const currentDate = new Date();
      const requestDate = new Date(this.cacheRequests[index].date);
      const dateDifferenceInSeconds = Math.round((currentDate.getTime() - requestDate.getTime()) / 1000);
      if(dateDifferenceInSeconds < this.cacheDuration()){
        return false;
      }else{
        return true;
      }
    } else {
      return true;
    }
  }

  private getResponseItem<T>(url: string): T {
    const index = this.cacheRequests.findIndex(cache => cache.url == url);
    if (index !== -1) {
      return this.cacheRequests[index].response as T;
    } else {
      return null;
    }
  };

  private saveReponseItem<T>(url: string, value: T): void {
    const index = this.cacheRequests.findIndex(cache => cache.url == url);
    if (index === -1) {
      this.cacheRequests.push({ url: url, response: value, date: new Date() })
      localStorage.setItem(CACHE_REQUESTS, JSON.stringify(this.cacheRequests));
    }else{
      // update the request infos
      this.cacheRequests.splice(index, 1, { url: url, response: value, date: new Date() })
      localStorage.setItem(CACHE_REQUESTS, JSON.stringify(this.cacheRequests));
    }
  };

  // Set cache duration 
  public setCacheDuration(duration: number) {
    this.cacheDuration.set(duration);
    localStorage.setItem(CACHE_DURATION, JSON.stringify(this.cacheDuration()));
  }

  // This method is used to remove cache Data (Reponse from localStorage) for a specific ZipCode
  removeCacheDataForSpacificLocation(zipCode: string){
    let index = this.cacheRequests.findIndex(cache => cache.url.includes(zipCode));
    while (index !== -1) {
      this.cacheRequests.splice(index, 1)
      index = this.cacheRequests.findIndex(cache => cache.url.includes(zipCode));
    }
    localStorage.setItem(CACHE_REQUESTS, JSON.stringify(this.cacheRequests));
  }
}
