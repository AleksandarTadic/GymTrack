import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTypeFormComponent } from './exercise-type-form.component';

describe('ExerciseTypeFormComponent', () => {
  let component: ExerciseTypeFormComponent;
  let fixture: ComponentFixture<ExerciseTypeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseTypeFormComponent]
    });
    fixture = TestBed.createComponent(ExerciseTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
