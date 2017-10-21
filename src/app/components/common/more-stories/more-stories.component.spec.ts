import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreStoriesComponent } from './more-stories.component';

describe('MoreStoriesComponent', () => {
  let component: MoreStoriesComponent;
  let fixture: ComponentFixture<MoreStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
