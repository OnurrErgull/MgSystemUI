import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!/^https?:\/\//i.test(req.url)) {
    req = req.clone({ url: `${environment.apiUrl.replace(/\/+$/,'')}/${req.url.replace(/^\/+/,'')}` });
  }
  return next(req);
};