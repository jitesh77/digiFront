import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMicrojobComponent } from './my-microjob.component';

describe('MyMicrojobComponent', () => {
  let component: MyMicrojobComponent;
  let fixture: ComponentFixture<MyMicrojobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMicrojobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMicrojobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
