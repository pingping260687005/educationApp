import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFinanceManagementComponent } from './teacher-finance-management.component';

describe('TeacherFinanceManagementComponent', () => {
  let component: TeacherFinanceManagementComponent;
  let fixture: ComponentFixture<TeacherFinanceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherFinanceManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFinanceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
