import { BaseView } from './../baseView';
import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Http } from '@angular/http';
// import 'rxjs/Rx';
import { Observable, from } from 'rxjs/index';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-student-courses-management',
  templateUrl: './student-courses-management.component.html',
  styleUrls: ['./student-courses-management.component.scss']
})
export class StudentCoursesManagementComponentComponent extends BaseView implements OnInit {
  dataSource: Observable<any>;
  columns = [{
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
  }];

   formErrors = {
     name: '',
     course: '',
     teacherName: '',
     applyDate: '',
     availableTimes: '',
     score: '',
     feedback: ''
   };

   // 为每一项表单验证添加说明文字
 validationMessage = {
  'name': {
    'required': '请填写姓名'
  },
  'course': {
    'required': '请填写课程'
  },
  'teacherName': {
    'required': '请填写教师'
  },
  'applyDate': {
    'required': '请填写报班日期',
  },
  'availableTimes': {
    'required': '请填写可用次数',
    'pattern': '请填写有效数字'
  },
  'score': {
    'required': '请填写成绩',
    'pattern': '请填写有效分数'
  },
  'feedback': {
    'required': '请填写反馈'
  }
};

listCb = () => {
    //////// hard code////////////////
    const list: StudentCourse[] = [];
    let studentCourse: StudentCourse;
    for (let i = 0; i < 100; i++) {
      studentCourse = {
        id: i.toString(),
        name: '随机 ' + i,
        course: '钢琴',
        teacherName: '马云',
        applyDate: '2018-11-06',
        availableTimes: '3',
        score: '100',
        feedback: '123'
      };
      list.push(studentCourse);
    }
    return list;
};

modifyCb = (data) => {};
addCb = (data) => {};
deleteCb = (data) => {};

  constructor(private http: Http, private formBuilder: FormBuilder) {
    super(formBuilder);
      // 用http请求
      this.dataSource = this.http.get('/api/students');
      // .map(res=> res.json());
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
      'name': ['', [
        Validators.required
      ]],
      'course': ['', [
        Validators.required
      ]],
      'teacherName': ['', [
        Validators.required
      ]],
      'applyDate': ['', [
        Validators.required,
      ]],
      'availableTimes': ['', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]],
      'score': ['', [
        Validators.required,
        Validators.pattern(/(^\d+$)|(^\d+\.\d{0,}$)/)
      ]],
      'feedback': ['', [
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
      this.addModifyDialogTitle = '添加学生课程';
      $('#submit-btn').addClass('disabled');
    } else {
      this.addModifyDialogTitle = '修改学生课程';
      const {id, name, course, teacherName, applyDate, availableTimes, score, feedback} = this.$table.bootstrapTable('getSelections', null)[0];
      this.form.setValue({
        id: id,
        name: name,
        course: course,
        teacherName: teacherName,
        applyDate: applyDate,
        availableTimes: availableTimes,
        score: score,
        feedback: feedback
      }); // 修改只能是一条数据，所以直接用第一个
      $('#submit-btn').removeClass('disabled');
    }
    modal.find('.address').attr('title', this.form.value ? this.form.value['address'] : '');
    modal.modal('show');
  }

}

interface StudentCourse {
  id: string;
  name: string;
  course: string;
  teacherName: string;
  applyDate: string;
  availableTimes: string;
  score: string;
  feedback: string;
}
