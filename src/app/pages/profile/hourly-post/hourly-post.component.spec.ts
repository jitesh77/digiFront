import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyPostComponent } from './hourly-post.component';

describe('HourlyPostComponent', () => {
  let component: HourlyPostComponent;
  let fixture: ComponentFixture<HourlyPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourlyPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
