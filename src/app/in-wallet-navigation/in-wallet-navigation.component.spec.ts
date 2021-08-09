import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InWalletNavigationComponent } from './in-wallet-navigation.component';

describe('InWalletNavigationComponent', () => {
  let component: InWalletNavigationComponent;
  let fixture: ComponentFixture<InWalletNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InWalletNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InWalletNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
