// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(credentials: { email: string, password: string }): Observable<{ token: string }> {
    console.log('Giriş bilgileri servise ulaştı:', credentials);

    // --- GERÇEK UYGULAMA SENARYOSU ---
    // Gerçek bir uygulamada burada HttpClient kullanarak backend'e POST isteği atılır.
    // return this.http.post<{ token: string }>('/api/auth/login', credentials);

    // --- SİMÜLASYON ---
    // Kullanıcı adı ve şifreyi kontrol edelim (simülasyon için)
    if (credentials.email === 'kullanici@test.com' && credentials.password === '123456') {
      // Başarılı girişi simüle et, 1 saniye gecikme ekle
      return of({ token: 'fake-jwt-token-string-for-demonstration' }).pipe(
        delay(1000),
        tap(response => {
          // Gelen token'ı localStorage'a kaydet.
          // **GÜVENLİK NOTU:** Hassas veriler için localStorage yerine HttpOnly cookie kullanmak daha güvenlidir.
          localStorage.setItem('authToken', response.token);
          console.log('Token başarıyla kaydedildi.');
        })
      );
    } else {
      // Hatalı girişi simüle et, 1 saniye gecikme ekle
      return throwError(() => new Error('Geçersiz e-posta veya şifre.')).pipe(
        delay(1000)
      );
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    console.log('Kullanıcı çıkış yaptı.');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}