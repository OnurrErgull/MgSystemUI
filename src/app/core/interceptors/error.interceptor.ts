import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // mesajı ister basitleştir, ister detaylandır
      const msg = err?.error?.message || err.message || 'Beklenmeyen hata';
      toastr.error(msg, 'Hata');
      return throwError(() => err);
    })
  );
};
