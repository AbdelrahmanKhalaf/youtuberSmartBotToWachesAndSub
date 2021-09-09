import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideParComponent } from './side-par.component';

describe('SideParComponent', () => {
  let component: SideParComponent;
  let fixture: ComponentFixture<SideParComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideParComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
