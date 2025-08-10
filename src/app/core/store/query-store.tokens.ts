import { InjectionToken } from '@angular/core';

export const QUERY_STORE_TTL = new InjectionToken<number>(
  'QUERY_STORE_TTL',
  { factory: () => 30_000 } // varsayılan 30sn
);
