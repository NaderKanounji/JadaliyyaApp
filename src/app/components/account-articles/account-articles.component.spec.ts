import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountArticlesComponent } from './account-articles.component';

describe('AccountArticlesComponent', () => {
  let component: AccountArticlesComponent;
  let fixture: ComponentFixture<AccountArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
