import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./layouts/ui/sidebar/sidebar.component";
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './interfaces/auth.status.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    SidebarComponent
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
