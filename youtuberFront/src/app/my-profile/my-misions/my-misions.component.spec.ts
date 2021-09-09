import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMisionsComponent } from './my-misions.component';

describe('MyMisionsComponent', () => {
  let component: MyMisionsComponent;
  let fixture: ComponentFixture<MyMisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
