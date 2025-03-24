import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cacheMap = new Map<string, ReplaySubject<any>>(); // Almacenamiento por clave

  get<T>(key: string, fallback: Observable<T>): Observable<T> {
    if (!this.cacheMap.has(key)) {
      const cache$ = new ReplaySubject<T>(1);
      this.cacheMap.set(key, cache$);
      fallback.pipe(shareReplay(1)).subscribe(cache$);
    }
    return this.cacheMap.get(key)!.asObservable();
  }

  clear(key: string): void {
    if (this.cacheMap.has(key)) {
      this.cacheMap.delete(key); // Elimina la caché específica
    }
  }

  clearAll(): void {
    this.cacheMap.clear(); // Limpia toda la caché
  }
}