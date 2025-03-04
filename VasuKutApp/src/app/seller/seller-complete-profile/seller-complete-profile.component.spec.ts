import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCompleteProfileComponent } from './seller-complete-profile.component';

describe('SellerCompleteProfileComponent', () => {
  let component: SellerCompleteProfileComponent;
  let fixture: ComponentFixture<SellerCompleteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerCompleteProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerCompleteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
