import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBouquteRaComponent } from './update-bouqute-ra.component';

describe('UpdateBouquteRaComponent', () => {
  let component: UpdateBouquteRaComponent;
  let fixture: ComponentFixture<UpdateBouquteRaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBouquteRaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBouquteRaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
