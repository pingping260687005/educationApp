import { BaseView } from './../baseView';
import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Http } from '@angular/http';
// import 'rxjs/Rx';
import { Observable, from, observable } from 'rxjs/index';
import { FormBuilder, Validators } from '@angular/forms';
import * as CommonService from '../common-service/commonService';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss']
})
export class CourseManagementComponentComponent extends BaseView implements OnInit {
  columns = [{
    checkbox: true,
    visiable: true
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
  }];

  dataSource: Observable<any>;
 formErrors = {
    courseTeacher: '',
    hours: '',
    cost: '',
    rate: ''
  };

  // 为每一项表单验证添加说明文字
 validationMessage = {
  'courseTeacher': {
    'required': '请填写教师'
  },
  'hours': {
    'required': '请填写学时',
    'pattern': '请填写有效学时',
    'min': '请填写有效学时'
  },
  'cost': {
    'required': '请填写费用',
    'pattern': '请填写有效费用',
    'min': '请填写有效费用'
  },
  'rate': {
    'required': '请填写评论',
  }
};

listCb = () => {
   //////// hard code////////////////
   const list: Course[] = [];
   let course: Course;
   for (let i = 0; i < 100; i++) {
     course = {
       id: i.toString(),
       courseTeacher: '钢琴-马云' + i,
       hours: 50,
       cost: 1500,
       rate: '5星'
     };
     list.push(course);
   }
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
      super(formBuilder, toastMessageService);
   }

  ngOnInit() {
    this.initView();
  }
  ngAfterViewInit() {
    this.initTable();
  }

 buildForm() {
    // 通过 formBuilder构建表单
    this.form = this.formBuilder.group({
      'id': ['', [
      ]],
      'courseTeacher': ['', [
        Validators.required
      ]],
      'hours': ['', [
        Validators.required,
        Validators.pattern(/(^\d+$)|(^\d+\.\d{0,}$)/),
        Validators.min(0)
      ]],
      'cost': ['', [
        Validators.required,
        Validators.pattern(/(^\d+$)|(^\d+\.\d{0,}$)/),
        Validators.min(0)
      ]],
      'rate': ['', [
        Validators.required,
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
      const {id, courseTeacher, hours, cost, rate} = this.$table.bootstrapTable('getSelections', null)[0];
      this.form.setValue({
        id: id,
        courseTeacher: courseTeacher,
        hours: hours,
        cost: cost,
        rate: rate
      }); // 修改只能是一条数据，所以直接用第一个
      $('#submit-btn').removeClass('disabled');

    }
    modal.modal('show');
  }
}


interface Course {
  id: string;
  courseTeacher: string;
  hours: number;
  cost: number;
  rate: string;
}
