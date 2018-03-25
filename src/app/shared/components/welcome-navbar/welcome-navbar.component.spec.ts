import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeNavbarComponent } from './welcome-navbar.component';

describe('WelcomeNavbarComponent', () => {
  let component: WelcomeNavbarComponent;
  let fixture: ComponentFixture<WelcomeNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
