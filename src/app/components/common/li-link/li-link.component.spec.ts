import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiLinkComponent } from './li-link.component';

describe('LiLinkComponent', () => {
  let component: LiLinkComponent;
  let fixture: ComponentFixture<LiLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
