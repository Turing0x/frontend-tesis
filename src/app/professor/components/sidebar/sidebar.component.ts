import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'professor-sidebar',
  standalone: true,
  imports: [RouterLink],
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
