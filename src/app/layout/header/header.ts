import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html'
})
export class Header {
  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
