import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFinanceManagementComponent } from './student-finance-management.component';

describe('StudentFinanceManagementComponent', () => {
  let component: StudentFinanceManagementComponent;
  let fixture: ComponentFixture<StudentFinanceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFinanceManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFinanceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
