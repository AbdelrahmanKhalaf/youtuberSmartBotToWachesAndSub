import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagNotFounComponent } from './pag-not-foun.component';

describe('PagNotFounComponent', () => {
  let component: PagNotFounComponent;
  let fixture: ComponentFixture<PagNotFounComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagNotFounComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagNotFounComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
