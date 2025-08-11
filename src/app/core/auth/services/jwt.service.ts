import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class JwtService {
  private readonly TOKEN_KEY = 'token';
  saveToken(t: string) { localStorage.setItem(this.TOKEN_KEY, t); }
  getToken(): string | null { return localStorage.getItem(this.TOKEN_KEY); }
  destroyToken() { localStorage.removeItem(this.TOKEN_KEY); }
}