import { Inject, Injectable, signal } from '@angular/core';
import { QUERY_STORE_TTL } from './query-store.tokens';

@Injectable()
export class QueryStore<T> {
  data = signal<T | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  private cacheKey = '';
  private at = 0;
   constructor(@Inject(QUERY_STORE_TTL) private ttlMs: number) {} 

  async load(key: string, fetcher: () => Promise<T>) {
    const now = Date.now();
    const fresh = key === this.cacheKey && now - this.at < this.ttlMs;

    if (fresh && this.data()) {
      this.refresh(fetcher); // SWR
      return;
    }
    await this.refresh(fetcher, key);
  }

  private async refresh(fetcher: () => Promise<T>, key?: string) {
    this.loading.set(true);
    this.error.set(null);
    try {
      const res = await fetcher();
      this.data.set(res);
      this.cacheKey = key ?? this.cacheKey;
      this.at = Date.now();
    } catch (e: any) {
      this.error.set(e?.message ?? 'Load failed');
    } finally {
      this.loading.set(false);
    }
  }

  clear() { this.data.set(null); this.at = 0; this.cacheKey = ''; }
}
