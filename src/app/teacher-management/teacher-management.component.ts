import { BaseView } from './../baseView';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, from } from 'rxjs/index';
import { FormBuilder, Validators } from '@angular/forms';
import * as CommonService from '../common-service/commonService';

@Component({
  selector: 'app-teacher-management',
  templateUrl: './teacher-management.component.html',
  styleUrls: ['./teacher-management.component.scss']
})
export class TeacherManagementComponentComponent extends BaseView implements OnInit {
  dataSource: Observable<any>;
  columns = [{
    checkbox: true,
    visiable: true
  },
   {
    field: 'teacherNum',
    title: '工号',
    sortable: true
  }, {
    field: 'name',
    title: '姓名',
    sortable: true
  }, {
    field: 'sex',
    title: '性别',
    sortable: true
  }, {
    field: 'age',
    title: '年龄',
    sortable: true
  }, {
    field: 'phone',
    title: '手机',
    sortable: true
  }, {
    field: 'address',
    title: '地址',
    sortable: true
  }, {
    field: 'issueDate',
    title: '入职日期',
    sortable: true
  }, {
    field: 'fullTime',
    title: '兼职/全职',
    sortable: true
  }, {
    field: 'course',
    title: '课程',
    sortable: true
  }];

 formErrors = {
    name: '',
    sex: '',
    age: '',
    phone: '',
    address: '',
    issueDate: '',
    fullTime: '',
    course: ''
  };

  // 为每一项表单验证添加说明文字
 validationMessage = {
  'name': {
    'required': '请填写姓名'
  },
  'sex': {
    'required': '请填写性别'
  },
  'age': {
    'required': '请填写年龄',
    'pattern': '请输入有效年龄',
    'min': '请输入有效年龄'
  },
  'phone': {
    'required': '请填写电话',
    'pattern': '请填写合法的手机号'
  },
  'address': {
    'required': '请填写地址'
  },
  'issueDate': {
    'required': '请填写入职日期'
  },
  'fullTime': {
    'required': '请填写是否全职'
  },
  'course': {
    'required': '请填写课程'
  }
};

listCb = () => {
    //////// hard code////////////////
    const list: Teacher[] = [];
    let teacher: Teacher;
    for (let i = 0; i < 100; i++) {
      teacher = {
        id: i.toString(),
        teacherNum: i.toString(),
        name: '随机 ' + i,
        sex: i % 2 === 0 ? '男' : '女',
        age: Math.floor(Math.random() * 100),
        phone: '13992288771',
        address: '丹阳市黄金路25弄16号201室',
        issueDate: '2018-04-04',
        fullTime: i % 2 === 0 ? '全职' : '兼职',
        course: '钢琴'
      };
      list.push(teacher);
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
    // this.dataSource = this.http.get('/api/teachers');
    // .map(res=> res.json());
    super(formBuilder, toastMessageService);
  }

  ngOnInit() {
    this.initView();
  }

 buildForm() {
    // 通过 formBuilder构建表单
    this.form = this.formBuilder.group({
      'id': ['', [
      ]],
      'name': ['', [
        Validators.required
      ]],
      'teacherNum': ['', [
        Validators.required
      ]],
      'issueDate': ['', [
        Validators.required
      ]],
      'age': ['', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.min(1)
      ]],
      'sex': ['', [
        Validators.required
      ]],
      'address': ['', [
        Validators.required
      ]],
      'fullTime': ['', [
        Validators.required
      ]],
      'phone': ['', [
        Validators.required,
        Validators.pattern(/^1[34578]\d{9}$/)
      ]],
      'course': ['', [
        Validators.required
      ]]
    });

    // 每次表单数据发生变化的时候更新错误信息
    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));

    // 初始化错误信息
    this.onValueChanged();
  }

  ngAfterViewInit() {
    this.initTable();
  }

 showModal(isAdd: boolean) {
    this.isAdd = isAdd;
    const modal = $('#addOrModifyModal');
    if (isAdd) {
      this.addModifyDialogTitle = '添加教师';
      $('#submit-btn').addClass('disabled');
    } else {
      this.addModifyDialogTitle = '修改教师';
      const {id, teacherNum, name, sex, age, phone, address, issueDate, fullTime, course} = this.$table.bootstrapTable('getSelections', null)[0];
      this.form.setValue({
        id: id,
        teacherNum: teacherNum,
        name: name,
        sex: sex,
        age: age,
        phone: phone,
        address: address,
        issueDate: issueDate,
        fullTime: fullTime,
        course: course
      }); // 修改只能是一条数据，所以直接用第一个
    }
    modal.find('.address').attr('title', this.form.value ? this.form.value['address'] : '');
    modal.modal('show');
  }

}

interface Teacher {
  id: string;
  teacherNum: string;
  name: string;
  sex: string;
  age: number;
  phone: string;
  address: string;
  issueDate: string;
  fullTime: string;
  course: string;
}
