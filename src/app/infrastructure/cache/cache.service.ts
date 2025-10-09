import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class CacheStoreService {
  set<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
