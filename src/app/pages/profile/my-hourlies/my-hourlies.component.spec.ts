import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHourliesComponent } from './my-hourlies.component';

describe('MyHourliesComponent', () => {
  let component: MyHourliesComponent;
  let fixture: ComponentFixture<MyHourliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHourliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHourliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
