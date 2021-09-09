import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBouquteRaComponent } from './details-bouqute-ra.component';

describe('DetailsBouquteRaComponent', () => {
  let component: DetailsBouquteRaComponent;
  let fixture: ComponentFixture<DetailsBouquteRaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBouquteRaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBouquteRaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
