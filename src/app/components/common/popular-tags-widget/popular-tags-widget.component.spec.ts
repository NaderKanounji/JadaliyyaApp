import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularTagsWidgetComponent } from './popular-tags-widget.component';

describe('PopularTagsWidgetComponent', () => {
  let component: PopularTagsWidgetComponent;
  let fixture: ComponentFixture<PopularTagsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularTagsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularTagsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
