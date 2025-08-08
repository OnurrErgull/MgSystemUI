// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(credentials: { email: string, password: string }): Observable<{ token: string }> {
    console.log("test");
    // --- SİMÜLASYON ---
    if (credentials.email === 'kullanici@test.com' && credentials.password === '123456') {
      return of({ token: 'fake-jwt-token-for-mgsystem' }).pipe(
        delay(1000),
        tap(response => {
          localStorage.setItem('authToken', response.token);
        })
      );
    } else {
      return throwError(() => new Error('Geçersiz e-posta veya şifre.')).pipe(
        delay(1000)
      );
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    // !! ifadesi, string bir değeri boolean'a çevirir (doluysa true, boşsa false)
    return !!localStorage.getItem('authToken');
  }
}