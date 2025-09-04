// import {
//   ApplicationConfig,
//   inject,
//   provideAppInitializer,
// } from "@angular/core";
// import { provideRouter } from "@angular/router";

// import { routes } from "./app.routes";
// import { provideHttpClient, withInterceptors } from "@angular/common/http";
// import { JwtService } from "./core/auth/services/jwt.service";
// import { AuthService } from "./core/auth/services/auth.service";
// // import { apiInterceptor } from "./core/interceptors/api.interceptor";
// import { tokenInterceptor } from "./core/interceptors/token.interceptor";
// import { errorInterceptor } from "./core/interceptors/error.interceptor";
// import { EMPTY } from "rxjs";
// import { authInterceptor } from "./core/interceptors/auth.interceptor";

// export function initAuth(auth: AuthService) {
//   return () => (auth.isLoggedIn() ? auth.me() : EMPTY);
// }

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(withInterceptors([authInterceptor, tokenInterceptor, errorInterceptor])),
//     provideAppInitializer(() => initAuth(inject(AuthService))()),
//   ],
// };




// import { ApplicationConfig, provideHttpClient, withInterceptors } from '@angular/common/http';
// import { authInterceptor } from './core/interceptors/auth.interceptor';
// import { errorInterceptor } from './core/interceptors/error.interceptor';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
//   ],
// };



// src/app/app.config.ts
import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { AuthService } from './core/auth/services/auth.service';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { apiInterceptor } from './core/interceptors/api.interceptor'; // sadece göreli URL'lere base ekliyorsa
import { EMPTY } from 'rxjs';

function initAuth(auth = inject(AuthService)) {
  return () => (auth.hasToken() ? auth.me() : EMPTY);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      apiInterceptor,      // <- base URL (sadece göreli URL’lere uygula)
      tokenInterceptor,    // <- Authorization: Bearer <token>
      errorInterceptor,
    ])),
    provideAnimations(),   // <-- @angular/animations gerekiyor
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 2500,
      closeButton: true,
      progressBar: true,
    }),                    // <-- ToastConfig provider’ı
    provideAppInitializer(() => initAuth()()),
  ],
};
