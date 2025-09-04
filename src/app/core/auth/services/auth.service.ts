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












// import { inject, Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ApiClient } from '../../http/api-client';

// export type LoginInput  = { username: string; password: string };
// export type LoginOutput = { token: string };
// export type Profile     = { id: number; username: string; email: string };

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private api = inject(ApiClient);
//   private TOKEN_KEY = 'token'; // <— interceptor da bunu okuyor olmalı

//   // POST /auth/login
//   login(credentials: LoginInput): Observable<LoginOutput> {
//     return this.api.post<LoginOutput>('auth/LoginCheck', credentials, {
//       idempotencyKey: crypto.randomUUID(),
//       retryCount: 0,
//     });
//   }

//   // GET /auth/me
//   me(): Observable<Profile> {
//     return this.api.get<Profile>('/auth/me');
//   }

//   // Token helpers
//   saveToken(token: string): void {
//     localStorage.setItem(this.TOKEN_KEY, token);
//   }

//   getToken(): string | null {
//     return localStorage.getItem(this.TOKEN_KEY);
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }

//   logout(): void {
//     localStorage.removeItem(this.TOKEN_KEY);
//   }
// }




// import { Injectable } from "@angular/core";
// import { Observable, BehaviorSubject } from "rxjs";

// import { JwtService } from "./jwt.service";
// import { map, distinctUntilChanged, tap, shareReplay } from "rxjs/operators";
// import { HttpClient } from "@angular/common/http";
// import { Profile, User } from "../auth.model";
// import { Router } from "@angular/router";

// @Injectable({ providedIn: "root" })
// export class AuthService {
//   private currentUserSubject = new BehaviorSubject<User | null>(null);
//   public currentUser = this.currentUserSubject
//     .asObservable()
//     .pipe(distinctUntilChanged());

//   public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

//   constructor(
//     private readonly http: HttpClient,
//     private readonly jwtService: JwtService,
//     private readonly router: Router,
//   ) { }

//   login(credentials: {
//     email: string;
//     password: string;
//   }): Observable<{ user: User }> {
//     return this.http
//       .post<{ user: User }>("auth/LoginCheck", { user: credentials })
//       .pipe(tap(({ user }) => this.setAuth(user)));
//   }

//   register(credentials: {
//     username: string;
//     email: string;
//     password: string;
//   }): Observable<{ user: User }> {
//     return this.http
//       .post<{ user: User }>("/users", { user: credentials })
//       .pipe(tap(({ user }) => this.setAuth(user)));
//   }

//   logout(): void {
//     this.purgeAuth();
//     void this.router.navigate(["/"]);
//   }

//   getCurrentUser(): Observable<{ user: User }> {
//     return this.http.get<{ user: User }>("/user").pipe(
//       tap({
//         next: ({ user }) => this.setAuth(user),
//         error: () => this.purgeAuth(),
//       }),
//       shareReplay(1),
//     );
//   }

//   update(user: Partial<User>): Observable<{ user: User }> {
//     return this.http.put<{ user: User }>("/user", { user }).pipe(
//       tap(({ user }) => {
//         this.currentUserSubject.next(user);
//       }),
//     );
//   }

//   setAuth(user: User): void {
//     if (user?.token) {
//       this.jwtService.saveToken(user.token);
//     }
//     this.currentUserSubject.next(user);
//   }

//   purgeAuth(): void {
//     this.jwtService.destroyToken();
//     this.currentUserSubject.next(null);
//   }
// }




// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
// import { JwtService } from './jwt.service';

// export interface User { id: number; username: string; email: string; image?: string | null; token?: string; }

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private http = inject(HttpClient);
//   private jwt = inject(JwtService);
//   private currentUserSubject = new BehaviorSubject<User | null>(null);

//   currentUser$ = this.currentUserSubject.asObservable();
//   hasToken(): boolean { return !!this.jwt.get(); }

//   login(credentials: { username: string; password: string }): Observable<{ user: User }> {
//     debugger
//     return this.http.post<{ user: any }>('/auth/logincheck', { user: credentials })
//       .pipe(tap(({ user }) => this.setAuth(user)));
//   }

//   me(): Observable<{ user: User }> {
//     return this.http.get<{ user: User }>('/user').pipe(
//       tap({ next: ({ user }) => this.setAuth(user), error: () => this.logout() }),
//       shareReplay(1)
//     );
//   }

//   update(user: Partial<User>) { return this.http.put<{ user: User }>('/user', { user }).pipe(tap(r => this.currentUserSubject.next(r.user))); }

//   logout() { this.jwt.clear(); this.currentUserSubject.next(null); }

//   private setAuth(user: User) { if (user?.token) this.jwt.save(user.token); this.currentUserSubject.next(user); }
// }



// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
// import { JwtService } from './jwt.service';
// import { environment } from '@src/environments/environment';
// import { ApiClient } from '../../http/api-client';

// export interface User { id?: number; username: string; email?: string; image?: string | null; token?: string; }
// export type LoginInput = { username: string; password: string };
// export type LoginOutput = { token: string };

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private http = inject(HttpClient);
//   private jwt = inject(JwtService);  
//   private api = inject(ApiClient);
//   private currentUserSubject = new BehaviorSubject<User | null>(null);
//   currentUser$ = this.currentUserSubject.asObservable();

//   hasToken(): boolean { return !!this.jwt.get(); }

//   // login(AppUserReq: LoginInput): Observable<LoginOutput> {
//   //   return this.http.post<LoginOutput>('/auth/logincheck', AppUserReq).pipe(
//   //     tap(({ token }) => this.jwt.save(token))
//   //   );
//   //   debugger
//   // }
//  login(input: LoginInput) {
//     return this.api.post<LoginOutput>('auth/LoginCheck', input, {
//       retryCount: 0,
//     }).pipe(tap(({ token }) => this.jwt.save(token)));
//   }

// //   // AuthService
// // login(credentials: { username: string; password: string }) {
// //   return this.http.get('/auth/test').pipe(
// //     tap({
// //       next: (x) => console.log('TEST OK:', x),
// //       error: (x) => console.log('TEST ERR:', x),
// //     }),
// //     shareReplay(1)
// //   );
// // }


//   // me(): Observable<{ user: User }> {
//   //   return this.http.get<{ user: User }>('/auth/me').pipe(
//   //     tap({ next: ({ user }) => this.currentUserSubject.next(user), error: () => this.logout() }),
//   //     shareReplay(1)
//   //   );
//   // }

//   logout() { this.jwt.clear(); this.currentUserSubject.next(null); }
// }






import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { AppUser, LoginInput, LoginResponse } from '../auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private jwt  = inject(JwtService);

  // Global state
  private currentUserSubject = new BehaviorSubject<AppUser | null>(this.hydrateUser());
  currentUser$: Observable<AppUser | null> = this.currentUserSubject.asObservable();
  isAuthenticated$: Observable<boolean>   = this.currentUser$.pipe(map(u => !!u));

  // Sync kontroller
  hasToken(): boolean        { return !!this.jwt.get(); }
  get currentUser(): AppUser | null { return this.currentUserSubject.value; }

  // LoginCheck -> { token, user }
  login(input: LoginInput) {
    return this.http.post<LoginResponse>('auth/LoginCheck', input).pipe(
      tap(({ token, user }) => {
        this.jwt.save(token);
        this.setUser(user);
      }),
      shareReplay(1)
    );
  }

  // me -> { user }
  me() {
    if (!this.hasToken()) return EMPTY;
    return this.http.post<any>('auth/me',null).pipe(
      tap({
        next: ({ user }) => {this.setUser(user);console.log(user)},
        // error: () => this.logout()
      }),
      shareReplay(1)
    );
  }

  logout() {
    this.jwt.clear();
    this.setUser(null);
  }

  // --- helpers
  private setUser(user: AppUser | null) {
    this.currentUserSubject.next(user);
    if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    else      localStorage.removeItem('currentUser');
  }

  private hydrateUser(): AppUser | null {
    const raw = localStorage.getItem('currentUser');
    try { return raw ? JSON.parse(raw) as AppUser : null; } catch { return null; }
  }
}
