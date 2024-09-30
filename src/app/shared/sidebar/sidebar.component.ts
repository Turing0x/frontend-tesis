import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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

  private route = inject(Router);

  public role!: string | null;

  ngOnInit(): void {
    this.role = localStorage.getItem('user_type');
    console.log(this.role);
  }

  onLogout(){
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_type');
    this.route.navigate(['/login']);
  }

}
