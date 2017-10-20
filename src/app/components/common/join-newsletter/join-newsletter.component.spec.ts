import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinNewsletterComponent } from './join-newsletter.component';

describe('JoinNewsletterComponent', () => {
  let component: JoinNewsletterComponent;
  let fixture: ComponentFixture<JoinNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
