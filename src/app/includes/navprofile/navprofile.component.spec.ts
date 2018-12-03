import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavprofileComponent } from './navprofile.component';

describe('NavprofileComponent', () => {
  let component: NavprofileComponent;
  let fixture: ComponentFixture<NavprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
