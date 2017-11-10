import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedNewsletterComponent } from './detailed-newsletter.component';

describe('DetailedNewsletterComponent', () => {
  let component: DetailedNewsletterComponent;
  let fixture: ComponentFixture<DetailedNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
