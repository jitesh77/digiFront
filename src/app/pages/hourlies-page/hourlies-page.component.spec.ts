import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourliesPageComponent } from './hourlies-page.component';

describe('HourliesPageComponent', () => {
  let component: HourliesPageComponent;
  let fixture: ComponentFixture<HourliesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourliesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourliesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
