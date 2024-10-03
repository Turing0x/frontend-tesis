import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
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
export class SolutionsComponent implements OnInit, AfterViewInit {
  
  private solutionService = inject(SolutionService);

  public solutions_aux!: Solution[];
  public solutions!: Solution[];

  ngOnInit(): void {
    this.solutionService.getAllSolutions().subscribe(
      data => {
        this.solutions_aux = data;
        this.solutions = data;
      }
    )
  }

  ngAfterViewInit(): void {
    const search = document.getElementById('search') as HTMLInputElement;
    search!.addEventListener('keyup', (e) => {
      const value = search!.value;
      if (value === ''){
        this.solutions_aux = this.solutions;
        return;
      }
      const filtered = this.solutions_aux.filter(solution => {
        return solution.student_id.full_name.toLowerCase().includes(value.toLowerCase());
      });

      this.solutions_aux = filtered.length > 0 ? filtered : this.solutions;
    
    });
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

  get gropus(): string[] {

    const gropus: string[] = [];

    this.solutions.forEach(solution => {
      if(!gropus.includes(solution.student_id.group)){
        gropus.push(solution.student_id.group);
      }
    });

    return gropus;
  }

  onGroupChange(){
    const group = document.getElementById('group') as HTMLSelectElement;
    const value = group.value;

    if (value === 'all'){
      this.solutions_aux = this.solutions;
      return;
    }

    this.solutions_aux = this.solutions.filter(solution => {
      return solution.student_id.group === value;
    });
  }

  onEvaluateChange() {
    const toggle = document.getElementById('toggle') as HTMLInputElement;
    const value = toggle.checked;

    if (value){
      this.solutions_aux = this.solutions.filter(solution => {
        return solution.evaluation === 0;
      });
      return;
    }
    this.solutions_aux = this.solutions;
  }

}
