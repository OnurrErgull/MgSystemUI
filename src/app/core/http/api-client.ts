import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, retry, timeout } from 'rxjs';

export type ApiEnvelope<T> = {
  success: boolean;
  message?: string | null;
  data?: T | null;
  errors?: string[] | null;
};

export type RequestOptions = {
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeoutMs?: number;     // default 15s
  retryCount?: number;    // default 0
  idempotencyKey?: string; // POST tekrarı için güvenli anahtar
};

const API_BASE_URL = '/api'; // istersen env’den oku

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private http = inject(HttpClient);

  private params(p?: Record<string, any>) {
    let hp = new HttpParams();
    if (!p) return hp;
    Object.entries(p).forEach(([k, v]) => {
      if (v !== undefined && v !== null) hp = hp.set(k, String(v));
    });
    return hp;
  }

  private options(opt?: RequestOptions) {
    let headers = new HttpHeaders(opt?.headers ?? {});
    if (opt?.idempotencyKey) headers = headers.set('Idempotency-Key', opt.idempotencyKey);
    return { params: this.params(opt?.params), headers };
  }

  private handle<T>(obs: Observable<ApiEnvelope<T>>, opt?: RequestOptions) {
    const to = opt?.timeoutMs ?? 15_000;
    const rc = opt?.retryCount ?? 0;
    return obs.pipe(
      timeout(to),
      retry(rc),
      map((res) => {
        if (!res?.success) {
          throw { message: res?.message ?? 'API error', details: res?.errors };
        }
        return res.data as T;
      })
    );
  }

  post<T>(url: string, body?: any, opt?: RequestOptions) {
    return this.handle<T>(this.http.post<ApiEnvelope<T>>(`${API_BASE_URL}${url}`, body, this.options(opt)), opt);
  }

  get<T>(url: string, opt?: RequestOptions) {
    return this.handle<T>(this.http.get<ApiEnvelope<T>>(`${API_BASE_URL}${url}`, this.options(opt)), opt);
  }

  postForm<T>(url: string, form: Record<string, string>, opt?: RequestOptions) {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded', ...(opt?.headers ?? {}) };
    const body = new URLSearchParams(form).toString();
    return this.handle<T>(
      this.http.post<ApiEnvelope<T>>(`${API_BASE_URL}${url}`, body, this.options({ ...opt, headers })),
      opt
    );
  }

  postMultipart<T>(url: string, data: Record<string, any>, opt?: RequestOptions) {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, v as any));
    return this.handle<T>(this.http.post<ApiEnvelope<T>>(`${API_BASE_URL}${url}`, fd, this.options(opt)), opt);
  }
}
