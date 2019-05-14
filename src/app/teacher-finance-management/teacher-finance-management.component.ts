import { BaseView } from './../baseView';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as CommonService from '../common-service/commonService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teacher-finance-management',
  templateUrl: './teacher-finance-management.component.html',
  styleUrls: ['./teacher-finance-management.component.scss']
})
export class TeacherFinanceManagementComponent extends BaseView implements OnInit {
  columns = [
    {
        checkbox: true,
        visiable: true
      },
      {
    field: 'name',
    title: '姓名'
}, {
    // unshown
    field: 'paidSalary',
    title: '已付工资',
    visible: false
}, {
    field: 'unPaidSalary',
    title: '未付工资'
},
{
  field: 'arrearage',
  title: '欠款'
},
{
field: 'date',
title: '发放日期'
},
{
field: 'period',
title: '间隔(月/年)'
}
];
   formErrors = {
      name: '',
      paidSalary: '',
      unPaidSalary: '',
      arrearage: '',
      date: '',
      period: '',
    };

      // 为每一项表单验证添加说明文字
    validationMessage = {
      'name': {
        'required': '请填写教师'
      },
      'paidSalary': {
        'required': '请填写已付工资',
        'pattern': '请输入有效值',
        'min': '请输入有效值'
      },
      'unPaidSalary': {
        'required': '请填写未付工资',
        'pattern': '请输入有效值',
        'min': '请输入有效值'
      },
      'arrearage': {
        'required': '请填写欠款',
        'pattern': '请输入有效值',
        'min': '请输入有效值'
      },
      'date': {
        'required': '请填写发放日期',
      },
      'period': {
        'required': '请填写间隔',
      }
    };
   listCb = () => {
       //////// hard code////////////////
    const list: ITeacherFinance[] = [];
    const tf: ITeacherFinance = {
        id: '1',
        name: 'XXX',
        paidSalary: 1000,
        unPaidSalary: 2000,
        arrearage: 1000,
        date: new Date().getTime().toString(),
        period: '111'
    };
    list.push(tf);
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

  constructor(private formBuilder: FormBuilder, private toastMessageService: CommonService.ToastMessageService) {
    super(formBuilder, toastMessageService);
   }

  ngOnInit() {
    this.initView();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.initTable();
}

 showModal(isAdd: boolean) {
    this.isAdd = isAdd;
    const modal = $('#addOrModifyModal');
    const selection = null;
    if (isAdd) {
      this.addModifyDialogTitle = '添加教师财务';
      $('#submit-btn').addClass('disabled');
    } else {
      this.addModifyDialogTitle = '修改教师财务';
      const {id, name, paidSalary, unPaidSalary, arrearage, date, period} = this.$table.bootstrapTable('getSelections', null)[0];
      this.form.setValue({
        id: id,
        name: name,
        paidSalary: paidSalary,
        unPaidSalary: unPaidSalary,
        arrearage: arrearage,
        date: date,
        period: period
      }); // 修改只能是一条数据，所以直接用第一个
      $('#submit-btn').removeClass('disabled');
    }
    modal.modal('show');
  }

 buildForm() {
       // 通过 formBuilder构建表单
 this.form = this.formBuilder.group({
  'id': [ '', [
   ]],
    'name': [ '', [
     Validators.required
    ]],
    'paidSalary': [ '', [
        Validators.required,
        Validators.pattern(/(^\d+$)|(^\d+\.\d{0,}$)/),
        Validators.min(0)
       ]],
       'unPaidSalary': [ '', [
        Validators.required,
        Validators.pattern(/(^\d+$)|(^\d+\.\d{0,}$)/),
        Validators.min(0)
       ]],
       'arrearage': [ '', [
        Validators.required,
        Validators.pattern(/(^\d+$)|(^\d+\.\d{0,}$)/),
        Validators.min(0)
       ]],
       'date': [ '', [
        Validators.required
       ]],
       period: ['' , [
         Validators.required
       ]]
    });

    // 每次表单数据发生变化的时候更新错误信息
    this.form.valueChanges
    .subscribe(data => this.onValueChanged(data));

    // 初始化错误信息
    this.onValueChanged();
  }
}

interface ITeacherFinance {
    id: string;
    name: string;
    paidSalary: number;
    unPaidSalary: number;
    arrearage: number;
    date: string;
    period: string;
}
