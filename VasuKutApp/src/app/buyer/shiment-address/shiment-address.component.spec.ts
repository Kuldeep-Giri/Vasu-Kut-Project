import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShimentAddressComponent } from './shiment-address.component';

describe('ShimentAddressComponent', () => {
  let component: ShimentAddressComponent;
  let fixture: ComponentFixture<ShimentAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShimentAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShimentAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
