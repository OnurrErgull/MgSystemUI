import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  getSidebar(): Observable<any> {
    
    return this.http.post<any>('auth/me',null).pipe(
      tap({
        next: ({ user }) => {
          this.setUser(user);console.log(user)},
        // error: () => this.logout()
      }),
      shareReplay(1)
    );
  }
}
