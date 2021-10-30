import { TestBed } from '@angular/core/testing';

import { IndividualChatService } from './individual-chat.service';

describe('IndividualChatService', () => {
  let service: IndividualChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividualChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
