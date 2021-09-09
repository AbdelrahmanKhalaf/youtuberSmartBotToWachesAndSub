import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDitalsComponent } from './my-ditals.component';

describe('MyDitalsComponent', () => {
  let component: MyDitalsComponent;
  let fixture: ComponentFixture<MyDitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
