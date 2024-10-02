import { Component, OnInit, inject } from '@angular/core';
import { CardComponent } from "../../../shared/card/card.component";
import { Solution } from '../../../interfaces/solution.interface';
import { SolutionService } from '../../../solution/services/solution.service';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CardComponent],
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

  getSoulution(id: string){
    this.solutionService.getSolution(id).subscribe(
      data => console.log(data)
    )
  }

}
