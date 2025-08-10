// src/app/services/auth.service.ts
/*import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ApiClient } from '../../http/api-client';

export type LoginInput = { username: string; password: string };
export type LoginOutput = { token: string };
export type Profile = { id: number; username: string; email: string };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private api = inject(ApiClient);
  // login(credentials: { email: string, password: string }): Observable<{ token: string }> {
  //   console.log("test");
    // // --- SİMÜLASYON ---
    // if (credentials.email === 'kullanici@test.com' && credentials.password === '123456') {
    //   return of({ token: 'fake-jwt-token-for-mgsystem' }).pipe(
    //     delay(1000),
    //     tap(response => {
    //       localStorage.setItem('authToken', response.token);
    //     })
    //   );
    // } else {
    //   return throwError(() => new Error('Geçersiz e-posta veya şifre.')).pipe(
    //     delay(1000)
    //   );
    // }
  // }
 login(credentials: { email: string, password: string }) {
    return this.api.post<LoginOutput>('/auth/login', credentials, {
      idempotencyKey: crypto.randomUUID(),
      retryCount: 0,
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    // !! ifadesi, string bir değeri boolean'a çevirir (doluysa true, boşsa false)
    return !!localStorage.getItem('authToken');
  }
}
*/

// import { Injectable, inject } from '@angular/core';
// import { ApiClient } from '../../core/http/api-client';

// export type LoginInput = { username: string; password: string };
// export type LoginOutput = { token: string };
// export type Profile = { id: number; username: string; email: string };

// @Injectable({ providedIn: 'root' })
// export class AuthApi {
//   private api = inject(ApiClient);

//   login(input: LoginInput) {
//     return this.api.post<LoginOutput>('/auth/login', input, {
//       idempotencyKey: crypto.randomUUID(),
//       retryCount: 0,
//     });
//   }

//   me() {
//     return this.api.get<Profile>('/auth/me');
//   }

//   saveToken(token: string) { localStorage.setItem('token', token); }
// }












import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../http/api-client';

export type LoginInput  = { username: string; password: string };
export type LoginOutput = { token: string };
export type Profile     = { id: number; username: string; email: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiClient);
  private TOKEN_KEY = 'token'; // <— interceptor da bunu okuyor olmalı

  // POST /auth/login
  login(credentials: LoginInput): Observable<LoginOutput> {
    return this.api.post<LoginOutput>('/auth/login', credentials, {
      idempotencyKey: crypto.randomUUID(),
      retryCount: 0,
    });
  }

  // GET /auth/me
  me(): Observable<Profile> {
    return this.api.get<Profile>('/auth/me');
  }

  // Token helpers
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
