import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // @if gibi yapılar için gerekli

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
export class LoginComponent {
  // Modern Dependency Injection: inject() fonksiyonu kullanımı
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Sinyaller: Bileşen state'ini yönetmek için modern ve reaktif bir yol
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  // Reaktif Form Tanımı
   loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // Form submit olduğunda çalışacak fonksiyon
  onSubmit(): void {
    // Formdaki tüm alanları "dokunulmuş" olarak işaretle (validation mesajlarını göstermek için)
    this.loginForm.markAllAsTouched();

    // Eğer form geçersiz ise işlemi durdur
    if (this.loginForm.invalid) {
      return;
    }

    // Yükleniyor durumunu ve hata mesajını ayarla
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const credentials = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Başarılı durumda
        console.log('Giriş başarılı!', response);
        // Kullanıcıyı ana sayfaya veya dashboard'a yönlendir
        // this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Hata durumunda
        console.error('Giriş hatası:', err);
        this.errorMessage.set(err.message || 'Bilinmeyen bir hata oluştu.');
      },
      complete: () => {
        // İstek tamamlandığında (başarılı ya da hatalı)
        this.isLoading.set(false);
      }
    });
  }
}