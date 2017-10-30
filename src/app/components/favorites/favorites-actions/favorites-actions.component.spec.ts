import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesActionsComponent } from './favorites-actions.component';

describe('FavoritesActionsComponent', () => {
  let component: FavoritesActionsComponent;
  let fixture: ComponentFixture<FavoritesActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
