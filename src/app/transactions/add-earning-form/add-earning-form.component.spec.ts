import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEarningFormComponent } from './add-earning-form.component';

describe('AddEarningFormComponent', () => {
  let component: AddEarningFormComponent;
  let fixture: ComponentFixture<AddEarningFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEarningFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEarningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
