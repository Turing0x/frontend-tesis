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

  public show = false

  public timeoutId: any;
  el: any;
  renderer: any;

  snackbarColor(){
    if( this.type === 'success' ){
      return 'var(--primary-color)';
    } else {
      return 'var(--warn-color)';
    }
  }

  closeSnackbar(){
    // this.show = false;

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

    // this.show = true;

    const snackbarElement = document.getElementById('snackbar');

    // Hacer visible el snackbar
    snackbarElement!.style.opacity = '1';

    this.timeoutId = setTimeout(() => {
      // this.show = false;
      snackbarElement!.style.opacity = '0';
    }, 2500);
  }

}
