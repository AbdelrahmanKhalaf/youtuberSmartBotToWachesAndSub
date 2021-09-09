import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BouqutsComponent } from './bouquts.component';

describe('BouqutsComponent', () => {
  let component: BouqutsComponent;
  let fixture: ComponentFixture<BouqutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BouqutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BouqutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
