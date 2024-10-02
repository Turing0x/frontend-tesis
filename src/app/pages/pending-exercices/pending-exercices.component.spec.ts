import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingExercicesComponent } from './pending-exercices.component';

describe('PendingExercicesComponent', () => {
  let component: PendingExercicesComponent;
  let fixture: ComponentFixture<PendingExercicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingExercicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingExercicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
