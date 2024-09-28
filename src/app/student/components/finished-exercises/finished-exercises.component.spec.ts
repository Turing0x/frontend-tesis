import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedExercisesComponent } from './finished-exercises.component';

describe('FinishedExercisesComponent', () => {
  let component: FinishedExercisesComponent;
  let fixture: ComponentFixture<FinishedExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedExercisesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
