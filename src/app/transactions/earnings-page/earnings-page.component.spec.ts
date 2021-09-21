import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsPageComponent } from './earnings-page.component';

describe('EarningsPageComponent', () => {
  let component: EarningsPageComponent;
  let fixture: ComponentFixture<EarningsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EarningsPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
