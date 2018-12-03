import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioPostComponent } from './portfolio-post.component';

describe('PortfolioPostComponent', () => {
  let component: PortfolioPostComponent;
  let fixture: ComponentFixture<PortfolioPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
