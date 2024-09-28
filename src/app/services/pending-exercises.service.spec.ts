import { TestBed } from '@angular/core/testing';

import { PendingExercisesService } from './pending-exercises.service';

describe('PendingExercisesService', () => {
  let service: PendingExercisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingExercisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
