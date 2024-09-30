import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'professor-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private route = inject(Router);

  onLogout(){
    localStorage.removeItem('user_id');
    this.route.navigate(['/login']);
  }

}
