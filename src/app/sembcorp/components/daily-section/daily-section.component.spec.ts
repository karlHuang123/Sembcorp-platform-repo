import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySectionComponent } from './daily-section.component';

describe('DailySectionComponent', () => {
  let component: DailySectionComponent;
  let fixture: ComponentFixture<DailySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailySectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
