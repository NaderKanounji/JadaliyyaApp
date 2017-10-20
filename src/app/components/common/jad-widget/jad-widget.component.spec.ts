import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JadWidgetComponent } from './jad-widget.component';

describe('JadWidgetComponent', () => {
  let component: JadWidgetComponent;
  let fixture: ComponentFixture<JadWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JadWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JadWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
