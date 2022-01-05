import { TestBed } from '@angular/core/testing';

import { DataVisualService } from './data-visual.service';

describe('DataVisualService', () => {
  let service: DataVisualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataVisualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
