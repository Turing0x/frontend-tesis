import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  private router = inject(Router);
  private authService = inject(AuthService);

  public role!: string | null;

  ngOnInit(): void {
    this.role = localStorage.getItem('user_type');
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
