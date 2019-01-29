import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Http } from '@angular/http';
// import 'rxjs/Rx';
import { Observable, from } from 'rxjs/index';
@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponentComponent implements OnInit {

  dataSource: Observable<any>;
  private addModifyDialogTitle = '';
  private isModifyBtnDisabled = true;
  private isDeleteBtnDisabled = true;
  constructor(private http: Http) {
      // 用http请求
      this.dataSource = this.http.get('/api/courses');
      // .map(res=> res.json());
   }

  ngOnInit() {
     // 真正的发请求取数据
     this.dataSource.subscribe((res) => {
      // get real data
      const courses: Course[] = JSON.parse(res['_body']);
      // set data
      // $('#courseMngTable').bootstrapTable('load', students);
    });
  }
  ngAfterViewInit() {
    $('#courseMngTable').bootstrapTable({
      columns: [{
        checkbox: true,
        visiable: true
      },
      {
        field: 'id',
        title: 'Item ID',
        visible: false,
        sortable: true
      },
       {
        field: 'courseTeacher',
        title: '课程-教师',
        sortable: true
      },
      {
        field: 'hours',
        title: '学时',
        sortable: true
      },
      {
        field: 'cost',
        title: '费用',
        sortable: true
      }, {
        field: 'rate',
        title: '评价',
        sortable: true
      }],
      data: this.getCourseList(),
      search: true,
      pagination: true,
      pageSize: 15,
      idField: 'id',
      uniqueId: 'id',
      smartDisplay: true,
      checkboxHeader: true,
      clickToSelect: true,
      toolbar: '#toolbar',
      onCheck: () => {
        this.updateToolbarIconsStatus();
      },
      onUncheck: () => {
        this.updateToolbarIconsStatus();
      }
    });
    this.updateToolbarIconsStatus();
  }

  private getCourseList(): Course[] {
    //////// hard code////////////////
    const courseList: Course[] = [];
    let course: Course;
    for (let i = 0; i < 100; i++) {
      course = {
        id: i.toString(),
        courseTeacher: '钢琴-马云' + i,
        hours: 50,
        cost: 1500,
        rate: '5星'
      };
      courseList.push(course);
    }
    return courseList;
  }

  private showModal(isAdd: boolean) {
    const modal = $('#addOrModifyModal');
    let selection = null;
    if (isAdd) {
      this.addModifyDialogTitle = '添加学生信息';
    } else {
      this.addModifyDialogTitle = '修改学生信息';
      selection = $('#courseMngTable').bootstrapTable('getSelections', null)[0]; // 修改只能是一条数据，所以直接用第一个
    }
    modal.find('.phone').val(selection ? selection['phone'] : '');
    modal.find('.name').val(selection ? selection['name'] : '');
    modal.find('.parentPhone').val(selection ? selection['parentPhone'] : '');
    modal.find('.age').val(selection ? selection['age'] : '');
    modal.find('.sex').val(selection ? selection['sex'] : '');
    modal.find('.address').val(selection ? selection['address'] : '');
    modal.find('.address').attr('title', selection ? selection['address'] : '');
    modal.modal('show');
  }

  private updateToolbarIconsStatus() {
    const selectionsLength = $('#courseMngTable').bootstrapTable('getSelections', null).length;
    this.isModifyBtnDisabled = selectionsLength !== 1;
    this.isDeleteBtnDisabled = selectionsLength === 0;
    if (this.isModifyBtnDisabled) {
      $('#modifyBtn').addClass('disabled');
    } else {
      $('#modifyBtn').removeClass('disabled');
    }
    if (this.isDeleteBtnDisabled) {
      $('#deleteBtn').addClass('disabled');
    } else {
      $('#deleteBtn').removeClass('disabled');
    }
  }

  private removeItems() {
    const table = $('#courseMngTable');
    const selections = table.bootstrapTable('getSelections', null);
    for (let i = 0; i < selections.length; i++) {
      table.bootstrapTable('removeByUniqueId', selections[i].id);
    }
    $('#deleteBtn').addClass('disabled');
  }
  ngOnDestroy() {
    $('#courseMngTable').bootstrapTable('destroy');
  }
}


interface Course {
  id: string;
  courseTeacher: string;
  hours: number;
  cost: number;
  rate: string;
}
