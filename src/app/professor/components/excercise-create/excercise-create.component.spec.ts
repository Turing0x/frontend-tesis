import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcerciseCreateComponent } from './excercise-create.component';

describe('ExcerciseCreateComponent', () => {
  let component: ExcerciseCreateComponent;
  let fixture: ComponentFixture<ExcerciseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcerciseCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcerciseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
