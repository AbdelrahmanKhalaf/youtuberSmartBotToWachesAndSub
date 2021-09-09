import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChannalsComponent } from './add-channals.component';

describe('AddChannalsComponent', () => {
  let component: AddChannalsComponent;
  let fixture: ComponentFixture<AddChannalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChannalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChannalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
