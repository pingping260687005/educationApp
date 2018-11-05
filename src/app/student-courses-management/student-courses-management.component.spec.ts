import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoursesManagementComponentComponent } from './student-courses-management.component';

describe('StudentCoursesManagementComponentComponent', () => {
  let component: StudentCoursesManagementComponentComponent;
  let fixture: ComponentFixture<StudentCoursesManagementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCoursesManagementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCoursesManagementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
