import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service'; 

@Component({
  selector: 'app-auth-page',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthComponent {
  private fb = inject(FormBuilder).nonNullable; // nonNullable kullandık
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const credentials = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      next: () => {
        // Başarılı giriş sonrası Admin paneline yönlendir
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Bilinmeyen bir hata oluştu.');
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }
}