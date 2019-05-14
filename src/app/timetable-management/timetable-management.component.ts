import { BaseView } from '../baseView';
import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Http } from '@angular/http';
// import 'rxjs/Rx';
import { Observable, from, observable } from 'rxjs/index';
import { FormBuilder, Validators } from '@angular/forms';
import * as CommonService from '../common-service/commonService'

@Component({
  selector: 'timetable-management',
  templateUrl: './timetable-management.component.html',
  styleUrls: ['./timetable-management.component.scss']
})
export class TimetableManagementComponentComponent extends BaseView implements OnInit {
  columns = [{
    checkbox: true,
    visiable: true
  },
   {
    field: 'timezone',
    title: '时间',
    sortable: true
  },
  {
    field: 'courseName',
    title: '课程',
    sortable: true
  },
  {
    field: 'teacherName',
    title: '教师',
    sortable: true
  }, {
    field: 'room',
    title: '教室',
    sortable: true
  },
  {
    field: 'students',
    title: '学生',
  },
  {
    field: 'isSuccess',
    title: '打卡',
  }];

  dataSource: Observable<any>;
 formErrors = {
    timezone: '',
    courseName: '',
    teacherName: '',
    students: ''
  };

  // 为每一项表单验证添加说明文字
 validationMessage = {
  'timezone': {
    'required': '请选择时间'
  },
  'courseName': {
    'required': '请选择课程'
  },
  'teacherName': {
    'required': '请选择教师'
  },
  'students': {
    'required': '请选择学生'
  }
};

listCb = () => {
   //////// hard code////////////////
   const list: TimeTable[] = [];
   let timeTable: TimeTable;
    timeTable = {
       id: '1',
       timezone: '18：00 - 20：00',
       courseName: '钢琴',
       teacherName: '马云',
       room: '201',
       students: '张三,李四'
     };
     list.push(timeTable);
     timeTable = {
      id: '1',
      timezone: '10：00 - 11：00',
      courseName: '钢琴3',
      teacherName: '马云2',
      room: '201',
      students: '熊孩子1,熊孩子2'
    };
    list.push(timeTable);
     timeTable = {
      id: '2',
      timezone: '13：00 - 15：00',
      courseName: '钢琴二',
      teacherName: '马天',
      room: '102',
      students: '张三,老王'
    };
    list.push(timeTable);
   return new Observable((observer) => {
    observer.next(list);
   });
}

addCb = (data) => {
  return new Observable((observer) => {
    observer.next();
   });
}
modifyCb = (data) => {
  return new Observable((observer) => {
    observer.next();
   });
}
deleteCb = (data) => {
  return new Observable((observer) => {
    observer.next();
   });
}

  constructor(private http: Http, private formBuilder: FormBuilder, private toastMessageService: CommonService.ToastMessageService) {
      // 用http请求
     // this.dataSource = this.http.get('/api/courses');
      // .map(res=> res.json());
      super(formBuilder,toastMessageService);
   }

  ngOnInit() {
    this.initView();
  }
  ngAfterViewInit() {
    this.initTable();
    $(".form_datetime").datepicker({format: 'yyyy-mm-dd'});
  }

 buildForm() {
    // 通过 formBuilder构建表单
    this.form = this.formBuilder.group({
      'id': ['', [
      ]],
      'timezone': ['', [
        Validators.required
      ]],
      'courseName': ['', [
        Validators.required
      ]],
      'teacherName': ['', [
        Validators.required
      ]],
      'room': ['', [
        Validators.required
      ]],
      'students': ['', [
        Validators.required
      ]]
    });

    // 每次表单数据发生变化的时候更新错误信息
    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));

    // 初始化错误信息
    this.onValueChanged();
  }

 showModal(isAdd: boolean) {
    this.isAdd = isAdd;
    const modal = $('#addOrModifyModal');
    if (isAdd) {
      this.addModifyDialogTitle = '添加课程';
      $('#submit-btn').addClass('disabled');
    } else {
      this.addModifyDialogTitle = '修改课程';
      const {id, timezone, courseName, teacherName, room, students} = this.$table.bootstrapTable('getSelections', null)[0];
      this.form.setValue({
        id,
        timezone,
        courseName,
        teacherName,
        room,
        students
      }); // 修改只能是一条数据，所以直接用第一个
      $('#submit-btn').removeClass('disabled');

    }
    modal.modal('show');
  }
}


interface TimeTable {
  id: string;
  timezone: string;
  courseName: string;
  teacherName: string;
  room: string;
  students: string;
}
