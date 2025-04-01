import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingStatsComponent } from './training-stats.component';

describe('TrainingStatsComponent', () => {
  let component: TrainingStatsComponent;
  let fixture: ComponentFixture<TrainingStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingStatsComponent]
    });
    fixture = TestBed.createComponent(TrainingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
