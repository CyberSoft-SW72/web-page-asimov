import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementTeacherComponent } from './announcement-teacher.component';

describe('AnnouncementTeacherComponent', () => {
  let component: AnnouncementTeacherComponent;
  let fixture: ComponentFixture<AnnouncementTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
