import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedioDetailManagementComponentComponent } from './vedio-detail-management.component';

describe('VedioDetailManagementComponentComponent', () => {
  let component: VedioDetailManagementComponentComponent;
  let fixture: ComponentFixture<VedioDetailManagementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedioDetailManagementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedioDetailManagementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
