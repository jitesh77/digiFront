import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourliesComponent } from './hourlies.component';

describe('HourliesComponent', () => {
  let component: HourliesComponent;
  let fixture: ComponentFixture<HourliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
