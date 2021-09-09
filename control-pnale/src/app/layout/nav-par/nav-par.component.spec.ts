import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavParComponent } from './nav-par.component';

describe('NavParComponent', () => {
  let component: NavParComponent;
  let fixture: ComponentFixture<NavParComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavParComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
