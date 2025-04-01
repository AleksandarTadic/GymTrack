import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SevenDayRangeSelectionStrategyComponent } from './seven-day-range-selection-strategy.component';

describe('SevenDayRangeSelectionStrategyComponent', () => {
  let component: SevenDayRangeSelectionStrategyComponent;
  let fixture: ComponentFixture<SevenDayRangeSelectionStrategyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SevenDayRangeSelectionStrategyComponent]
    });
    fixture = TestBed.createComponent(SevenDayRangeSelectionStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
