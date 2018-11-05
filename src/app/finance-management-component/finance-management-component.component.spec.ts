import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceManagementComponentComponent } from './finance-management-component.component';

describe('FinanceManagementComponentComponent', () => {
  let component: FinanceManagementComponentComponent;
  let fixture: ComponentFixture<FinanceManagementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceManagementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceManagementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
