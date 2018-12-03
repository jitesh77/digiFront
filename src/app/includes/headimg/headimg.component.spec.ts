import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadimgComponent } from './headimg.component';

describe('HeadimgComponent', () => {
  let component: HeadimgComponent;
  let fixture: ComponentFixture<HeadimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadimgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
