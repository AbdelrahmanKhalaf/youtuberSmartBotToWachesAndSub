import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoddingComponent } from './lodding.component';

describe('LoddingComponent', () => {
  let component: LoddingComponent;
  let fixture: ComponentFixture<LoddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
