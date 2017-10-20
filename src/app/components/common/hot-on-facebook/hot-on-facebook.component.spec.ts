import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotOnFacebookComponent } from './hot-on-facebook.component';

describe('HotOnFacebookComponent', () => {
  let component: HotOnFacebookComponent;
  let fixture: ComponentFixture<HotOnFacebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotOnFacebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotOnFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
