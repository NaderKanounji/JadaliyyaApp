import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JadNavWidgetComponent } from './jad-nav-widget.component';

describe('JadNavWidgetComponent', () => {
  let component: JadNavWidgetComponent;
  let fixture: ComponentFixture<JadNavWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JadNavWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JadNavWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
