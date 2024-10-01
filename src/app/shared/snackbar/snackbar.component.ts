import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-snackbar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {

  @Input() title!: string;
  @Input() description!: string;
  @Input() type!: 'success' | 'error';

  public timeoutId: any;

  snackbarColor(){
    if( this.type === 'success' ){
      return 'var(--primary-color)';
    } else {
      return 'var(--warn-color)';
    }
  }

  closeSnackbar(){
    const snackbarElement = document.getElementById('snackbar');

    snackbarElement!.style.opacity = '0';

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

  }

  showSnackbar( title: string, description: string, type: 'success' | 'error', timeout: number = 3000 ){
    this.title = title;
    this.description = description;
    this.type = type;

    const snackbarElement = document.getElementById('snackbar');

    snackbarElement!.style.opacity = '1';

    this.timeoutId = setTimeout(() => {
      snackbarElement!.style.opacity = '0';
    }, 2500);
  }

}
