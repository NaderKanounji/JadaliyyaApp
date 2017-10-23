import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JadNavigationComponent } from './jad-navigation.component';

describe('JadNavigationComponent', () => {
  let component: JadNavigationComponent;
  let fixture: ComponentFixture<JadNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JadNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JadNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
