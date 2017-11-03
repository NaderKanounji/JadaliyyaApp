import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSharedComponent } from './account-shared.component';

describe('AccountSharedComponent', () => {
  let component: AccountSharedComponent;
  let fixture: ComponentFixture<AccountSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
