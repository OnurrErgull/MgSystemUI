// import { Component, inject, signal } from '@angular/core';
// import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { firstValueFrom } from 'rxjs';

// import { AuthService, LoginInput, Profile } from './services/auth.service';
// import { MutationStore } from '../store/mutation.store';
// import { QueryStore } from '../store/query.store';

// @Component({
//   selector: 'app-auth-page',
//   standalone: true,
//   templateUrl: './auth.component.html',
//   styleUrls: ['./auth.component.css'], // <-- styleUrls (çoğul)
//   imports: [CommonModule, ReactiveFormsModule],
//   // providers: [MutationStore, QueryStore]  // <-- GEREK YOK (generic farklarından ötürü)
// })
// export class AuthComponent {
//   private fb = inject(FormBuilder).nonNullable;
//   private authService = inject(AuthService);
//   private router = inject(Router);

//   // İstersen tut, ama butonda login.loading() kullanacağız
//   errorMessage = signal<string | null>(null);

//   // Email + Password formu
//   loginForm = this.fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', [Validators.required, Validators.minLength(6)]],
//   });

//   // Store'lar — component içinde oluştur (en temiz yol)
//   login = new MutationStore<LoginInput, { token: string }>();
//   profile = new QueryStore<Profile>(60_000);

//   async onSubmit(): Promise<void> {
//     this.loginForm.markAllAsTouched();
//     if (this.loginForm.invalid) return;

//     const raw = this.loginForm.getRawValue();
//     // API tarafında LoginInput { username, password } ise email’i username’e eşle
//     const credentials: LoginInput = { username: raw.email!, password: raw.password! };

//     await this.login
//       .call((input) => firstValueFrom(this.authService.login(input)), credentials)
//       .then((res) => {
//         this.authService.saveToken(res.token);
//         // Profilini çekip anasayfaya geçelim (opsiyonel)
//         return this.loadProfile().then(() => this.router.navigateByUrl('/'));
//       })
//       .catch((err) => {
//         debugger
//         this.errorMessage.set(err?.message ?? 'Login failed');
//       });
//   }

//   async loadProfile(): Promise<void> {
//     await this.profile.load('me', () => firstValueFrom(this.authService.me()));
//   }
// }





import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true); this.error.set(null);
    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (e) => {
         this.error.set(e?.error?.message || 'Giriş başarısız'); 
         this.loading.set(false); 
      },
    });
  }
}