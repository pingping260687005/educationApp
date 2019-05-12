import { BaseView } from './../baseView';
import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Http } from '@angular/http';
// import 'rxjs/Rx';
import { Observable, from } from 'rxjs/index';
import { StudentService } from './student.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.scss']
})
export class StudentManagementComponent extends BaseView implements OnInit {
   // 定义表单
   formErrors = {
    studentNum: '',
    name: '',
    sex: '',
    age: '',
    phone: '',
    parentPhone: '',
    address: '',
    course: ''
  };

  columns = [{
    checkbox: true,
    visiable: true
  }, {
    field: 'studentNum',
    title: '学号',
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
    field: 'parentPhone',
    title: '父母手机',
    sortable: true
  }, {
    field: 'address',
    title: '地址',
    sortable: true
  }, {
    field: 'videoId',
    title: '视频页',
    sortable: true
  }];
 // 为每一项表单验证添加说明文字
 validationMessage = {
  'studentNum': {
    'required': '请填写学号',
    'pattern': '请输入数字'
  },
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
    'required': '请填写手机',
    'pattern': '请填写合法的手机号'
  },
  'parentPhone': {
    'required': '请填写父母手机',
    'pattern': '请填写合法的手机号'
  },
  'address': {
    'required': '请填写地址'
  },
  'course': {
    'required': '请填写课程'
  }
};
listCb = () => {
  //////// hard code////////////////
  const list: Student[] = [];
  let student: Student;
  for (let i = 0; i < 100; i++) {
    student = {
      id: i.toString(),
      studentNum: i.toString(),
      name: '随机 ' + i,
      sex: i % 2 === 0 ? '男' : '女',
      age: Math.floor(Math.random() * 100),
      phone: '13992288771',
      parentPhone: '13992288771',
      address: '丹阳市黄金路25弄16号201室',
      course: 'xxx'
    };
    list.push(student);
  }
  return list;
}

addCb = (data) => {};

  modifyCb = (data) => {};

  deleteCb = (data) => {};

  constructor(private http: Http, private studentService: StudentService, private formBuilder: FormBuilder) {
    super(formBuilder);
  }
  ngOnInit() {
    this.initView();
  }

  setAllStudents() {
    this.studentService.getAllStudent().subscribe((students: Student[]) => {
      this.$table.bootstrapTable('load', students);
    });
  }

  buildForm() {
    // 通过 formBuilder构建表单
    this.form = this.formBuilder.group({
      'id': ['', [
      ]],
      'studentNum': ['', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]],
      'name': ['', [
        Validators.required
      ]],
      'sex': ['', [
        Validators.required
      ]],
      'age': ['', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.min(1)
      ]],
      'phone': ['', [
        Validators.required,
        Validators.pattern(/^1[34578]\d{9}$/)
      ]],
      'parentPhone': ['', [
        Validators.required,
        Validators.pattern(/^1[34578]\d{9}$/)
      ]],
      'address': ['', [
        Validators.required
      ]],
      'course': ['', [
        Validators.required
      ]]
    }, {'updateOn': 'blur'});

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
      this.addModifyDialogTitle = '添加学生信息';
      $('#submit-btn').addClass('disabled');
    } else {
      this.addModifyDialogTitle = '修改学生信息';
     const {id, studentNum, name, sex, age, phone, parentPhone, address, course} = this.$table.bootstrapTable('getSelections', null)[0];
      this.form.setValue({
        id: id,
        studentNum: studentNum,
        name: name,
        sex: sex,
        age: age,
        phone: phone,
        parentPhone: parentPhone,
        address: address,
        course: course
      }); // 修改只能是一条数据，所以直接用第一个
      $('#submit-btn').removeClass('disabled');
    }
    modal.modal('show');
  }
}

