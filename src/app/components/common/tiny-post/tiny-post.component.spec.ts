import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyPostComponent } from './tiny-post.component';

describe('TinyPostComponent', () => {
  let component: TinyPostComponent;
  let fixture: ComponentFixture<TinyPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinyPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
