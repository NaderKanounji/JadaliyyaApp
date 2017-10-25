import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialBlockComponent } from './social-block.component';

describe('SocialBlockComponent', () => {
  let component: SocialBlockComponent;
  let fixture: ComponentFixture<SocialBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
