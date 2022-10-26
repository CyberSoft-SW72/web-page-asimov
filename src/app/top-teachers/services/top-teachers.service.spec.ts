import { TestBed } from '@angular/core/testing';
import { TopTeachersService } from "./top-teachers.service";


describe('TopTeachersService', () => {
  let service: TopTeachersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopTeachersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
