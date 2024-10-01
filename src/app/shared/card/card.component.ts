import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() title: string = 'Titulo';
  @Input() description: string = 'Descripción';
  @Input() link: string = 'Link';
  @Input() param: string = 'Param';

}
