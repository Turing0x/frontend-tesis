import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardComponent { }
