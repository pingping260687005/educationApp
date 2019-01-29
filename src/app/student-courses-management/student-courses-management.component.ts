import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Http } from '@angular/http';
// import 'rxjs/Rx';
import { Observable, from } from 'rxjs/index';
@Component({
  selector: 'app-student-courses-management',
  templateUrl: './student-courses-management.component.html',
  styleUrls: ['./student-courses-management.component.css']
})
export class StudentCoursesManagementComponentComponent implements OnInit {
  dataSource: Observable<any>;
  private addModifyDialogTitle = '';
  private isModifyBtnDisabled = true;
  private isDeleteBtnDisabled = true;
  constructor(private http: Http) {
      // 用http请求
      this.dataSource = this.http.get('/api/students');
      // .map(res=> res.json());
   }

  ngOnInit() {
     // 真正的发请求取数据
     this.dataSource.subscribe((res) => {
      // get real data
      const students: Student[] = JSON.parse(res['_body']);
      // set data
      // $('#studentMngTable').bootstrapTable('load', students);
    });

    $(window).resize(() => {
      $('#studentMngTable').bootstrapTable('resetView', {height: $(window).height() - 76 - 20});
    });
  }
  ngAfterViewInit() {
    $('#studentMngTable').bootstrapTable({
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
        field: 'name',
        title: '姓名',
        sortable: true
      },
      {
        field: 'course',
        title: '课程',
        sortable: true
      },
      {
        field: 'teacherName',
        title: '教师',
        sortable: true
      }, {
        field: 'applyDate',
        title: '报班日期',
        sortable: true
      }, {
        field: 'availableTimes',
        title: '可用次数',
        sortable: true
      }, {
        field: 'score',
        title: '成绩',
        sortable: true
      }, {
        field: 'feedback',
        title: '反馈',
        sortable: true
      }],
      data: this.getStudentList(),
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

  private getStudentList(): Student[] {
    //////// hard code////////////////
    const studentList: Student[] = [];
    let student: Student;
    for (let i = 0; i < 100; i++) {
      student = {
        id: i.toString(),
        name: '随机 ' + i,
        course: '钢琴',
        teacherName: '马云',
        applyDate: '2018-11-06',
        availableTimes: '3',
        score: '100',
        feedback: '123'
      };
      studentList.push(student);
    }
    return studentList;
  }

  private showModal(isAdd: boolean) {
    const modal = $('#addOrModifyModal');
    let selection = null;
    if (isAdd) {
      this.addModifyDialogTitle = '添加学生信息';
    } else {
      this.addModifyDialogTitle = '修改学生信息';
      selection = $('#studentMngTable').bootstrapTable('getSelections', null)[0]; // 修改只能是一条数据，所以直接用第一个
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
    const selectionsLength = $('#studentMngTable').bootstrapTable('getSelections', null).length;
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
    const table = $('#studentMngTable');
    const selections = table.bootstrapTable('getSelections', null);
    for (let i = 0; i < selections.length; i++) {
      table.bootstrapTable('removeByUniqueId', selections[i].id);
    }
    $('#deleteBtn').addClass('disabled');
  }
  ngOnDestroy() {
    $('#studentMngTable').bootstrapTable('destroy');
  }

}

interface Student {
  id: string;
  name: string;
  course: string;
  teacherName: string;
  applyDate: string;
  availableTimes: string;
  score: string;
  feedback: string;
}
