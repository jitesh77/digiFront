import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerReqComponent } from './buyer-req.component';

describe('BuyerReqComponent', () => {
  let component: BuyerReqComponent;
  let fixture: ComponentFixture<BuyerReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
