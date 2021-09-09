import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetilsEmailComponent } from './detils-email.component';

describe('DetilsEmailComponent', () => {
  let component: DetilsEmailComponent;
  let fixture: ComponentFixture<DetilsEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetilsEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetilsEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
