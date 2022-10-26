import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopTeachersComponent } from './top-teachers.component';


describe('TeachersComponent', () => {
  let component: TopTeachersComponent;
  let fixture: ComponentFixture<TopTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopTeachersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
