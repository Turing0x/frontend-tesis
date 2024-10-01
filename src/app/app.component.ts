import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontendTesis';

  private authService = inject(AuthService);
  private router = inject(Router);

  // constructor() {
  //   if (this.authService.authStatus() === AuthStatus.notAuthenticated) {
  //     const lastPath = localStorage.getItem('last_path');
  //     if (lastPath) {
  //       this.router.navigate([lastPath]);
  //     }
  //   }
  // }
}
