import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchproductDisplayComponent } from './searchproduct-display.component';

describe('SearchproductDisplayComponent', () => {
  let component: SearchproductDisplayComponent;
  let fixture: ComponentFixture<SearchproductDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchproductDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchproductDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
