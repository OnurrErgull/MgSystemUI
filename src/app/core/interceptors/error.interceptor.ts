import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError(err => {
      // Burada global toast/telemetry
      console.error('[API ERROR]', err);
      return throwError(() => err);
    })
  );
