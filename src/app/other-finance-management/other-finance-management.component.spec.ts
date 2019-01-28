import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherFinanceManagementComponent } from './other-finance-management.component';

describe('OtherFinanceManagementComponent', () => {
  let component: OtherFinanceManagementComponent;
  let fixture: ComponentFixture<OtherFinanceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherFinanceManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherFinanceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
