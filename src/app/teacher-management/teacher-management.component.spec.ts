import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherManagementComponentComponent } from './teacher-management.component';

describe('TeacherManagementComponentComponent', () => {
  let component: TeacherManagementComponentComponent;
  let fixture: ComponentFixture<TeacherManagementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherManagementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherManagementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
