import { TestBed } from '@angular/core/testing';

import { ToolBaringService } from './tool-baring.service';

describe('ToolBaringService', () => {
  let service: ToolBaringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolBaringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
