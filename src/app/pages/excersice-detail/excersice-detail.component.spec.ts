import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcersiceDetailComponent } from './excersice-detail.component';

describe('ExcersiceDetailComponent', () => {
  let component: ExcersiceDetailComponent;
  let fixture: ComponentFixture<ExcersiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcersiceDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcersiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
