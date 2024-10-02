import { Component, OnInit, inject } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { Solution } from '../../interfaces/solution.interface';
import { SolutionService } from '../../services/solution.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CardComponent
  ],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css'
})
export class SolutionsComponent implements OnInit {

  private solutionService = inject(SolutionService);

  public solutions!: Solution[];

  ngOnInit(): void {
    this.solutionService.getAllSolutions().subscribe(
      data => this.solutions = data
    )
  }

  calificationColor( calif: number ){
    if (calif === 0){
      return 'lightgray';
    }else if(calif < 3){
      return 'var(--warn-color)';
    } else {
      return 'var(--button-primary)';
    }
  }
}
