import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCompetencesComponent } from './dialog-competences.component';

describe('DialogCompetencesComponent', () => {
  let component: DialogCompetencesComponent;
  let fixture: ComponentFixture<DialogCompetencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCompetencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
