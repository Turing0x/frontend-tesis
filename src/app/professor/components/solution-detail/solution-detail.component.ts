import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solution } from '../../../interfaces/solution.interface';
import { SolutionService } from '../../../solution/services/solution.service';

@Component({
  selector: 'app-solution-detail',
  standalone: true,
  imports: [],
  templateUrl: './solution-detail.component.html',
  styleUrl: './solution-detail.component.css'
})
export class SolutionDetailComponent implements OnInit {

  private cdrf = inject(ChangeDetectorRef);

  private activateRoute = inject(ActivatedRoute);
  private solService = inject(SolutionService);

  public solution!: Solution;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      const id = params['id'];
      this.solService.getSolution(id).subscribe(solution => {
        this.solution = solution;
        this.cdrf.detectChanges();
      });
    });
  }

}
