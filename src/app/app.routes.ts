// import { Router, Routes } from "@angular/router";
// import { inject } from "@angular/core";
// import { map } from "rxjs/operators";
// import { AuthService } from "./core/auth/services/auth.service";

// export const routes: Routes = [
//   {
//     path: "",
//     loadComponent: () => import("./features/article/pages/home/home.component"),
//   },
//   {
//     path: "login",
//     loadComponent: () => import("./core/auth/auth.component"),
//     canActivate: [
//       () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
//     ],
//   },
//   {
//     path: "register",
//     loadComponent: () => import("./core/auth/auth.component"),
//     canActivate: [
//       () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
//     ],
//   },
//   {
//     path: "settings",
//     loadComponent: () => import("./features/settings/settings.component"),
//     canActivate: [() => inject(UserService).isAuthenticated],
//   },
//   {
//     path: "profile",
//     loadChildren: () => import("./features/profile/profile.routes"),
//   },
//   {
//     path: "editor",
//     children: [
//       {
//         path: "",
//         loadComponent: () =>
//           import("./features/article/pages/editor/editor.component"),
//         canActivate: [() => inject(UserService).isAuthenticated],
//       },
//       {
//         path: ":slug",
//         loadComponent: () =>
//           import("./features/article/pages/editor/editor.component"),
//         canActivate: [() => inject(UserService).isAuthenticated],
//       },
//     ],
//   },
//   {
//     path: "article/:slug",
//     loadComponent: () =>
//       import("./features/article/pages/article/article.component"),
//   },
// ];






// export const routes: Routes = [
//   {
//     path: "",
//     loadComponent: () => import("./features/article/pages/home/home.component"),
//     canActivate: [() => inject(AuthService).hasToken()]
//   },
//   {
//     path: '',
//     redirectTo: 'login', // Uygulama açıldığında doğrudan login'e yönlendir
//     pathMatch: 'full'
//   },
//   {
//     path: "login",
//     loadComponent: () => import("./core/auth/auth.component").then(m => m.AuthComponent),
//     canActivate: [
//       () => inject(AuthService).hasToken().pipe(map((isAuth) => !isAuth)),
//     ],
//   }
// ];

// export const routes: Routes = [
//   {
//     path: '',
//     loadComponent: () => import('./features/article/pages/home/home.component'),
//     canActivate: [() => inject(AuthService).hasToken()
//       ? true
//       : inject(Router).createUrlTree(['/login'])]
//   },
//   {
//     path: 'login',
//     loadComponent: () => import('./core/auth/auth.component').then(m => m.AuthComponent),
//     canActivate: [() => inject(AuthService).hasToken()
//       ? inject(Router).createUrlTree(['/'])
//       : true]
//   },
//   { path: '**', redirectTo: '' }
// ];


import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './core/auth/services/auth.service';
import { LoginComponent } from './core/layout/login/login.component';
import { GeneralComponent } from './core/layout/general/general.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';

const authGuard = () =>
  inject(AuthService).hasToken() ? true : inject(Router).createUrlTree(['/login']);

const guestGuard = () =>
  inject(AuthService).hasToken() ? inject(Router).createUrlTree(['/']) : true;

export const routes: Routes = [
  // {
  //   path: '',
  //   loadComponent: () => import('./features/article/pages/home/home.component'),
  //   canActivate: [authGuard]
  // },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./core/auth/auth.component').then(m => m.AuthComponent),
  //   canActivate: [guestGuard]
  // },
  // { path: '**', redirectTo: '' }


  {
    path: '',
    component: GeneralComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent),
      },
    ],
  },
  
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],            // loginliyse içeri alma, app'e yönlendir
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./core/auth/auth.component')
            .then(m => m.AuthComponent),
      }
    ],
  },

  { path: '**', redirectTo: '' },
];