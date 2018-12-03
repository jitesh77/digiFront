import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBuyerrequestsComponent } from './my-buyerrequests.component';

describe('MyBuyerrequestsComponent', () => {
  let component: MyBuyerrequestsComponent;
  let fixture: ComponentFixture<MyBuyerrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBuyerrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBuyerrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
