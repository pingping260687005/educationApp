import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseManagementComponentComponent } from './course-management.component';

describe('CourseManagementComponentComponent', () => {
  let component: CourseManagementComponentComponent;
  let fixture: ComponentFixture<CourseManagementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseManagementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseManagementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
