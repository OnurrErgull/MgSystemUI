import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../auth/services/jwt.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(JwtService).get();
  if (token) req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  return next(req);
};
