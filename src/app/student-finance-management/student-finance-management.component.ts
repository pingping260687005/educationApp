import { BaseView } from './../baseView';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as CommonService from '../common-service/commonService';

@Component({
  selector: 'app-student-finance-management',
  templateUrl: './student-finance-management.component.html',
  styleUrls: ['./student-finance-management.component.scss']
})
export class StudentFinanceManagementComponent extends BaseView implements OnInit {
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
    field: 'paidTuition',
    title: '已付学费',
}, {
    field: 'shouldPaidTuition',
    title: '应付学费'
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
    paidTuition: '',
    shouldPaidTuition: '',
    arrearage: '',
    date: '',
    period: ''
  };

  // 为每一项表单验证添加说明文字
 validationMessage = {
  'name': {
    'required': '请填写姓名'
  },
  'paidTuition': {
    'required': '请填写已付费用',
    'pattern': '请输入有效值',
    'min': '请输入有效值'
  },
  'shouldPaidTuition': {
    'required': '请填写应付费用',
    'pattern': '请输入有效值',
    'min': '请输入有效值'
  },
  'arrearage': {
    'required': '请填写欠款',
    'pattern': '请输入有效值',
    'min': '请输入有效值'
  },
  'date': {
    'required': '请填写收费日期',
  },
  'period': {
    'required': '请填写间隔',
  }
};

listCb = () => {
   //////// hard code////////////////
   const list: IStudentFinance[] = [];
   const tf: IStudentFinance = {
       id: '1',
       name: 'XXX',
       paidTuition: 1000,
       shouldPaidTuition: 2000,
       arrearage: 1000,
       date: new Date().getTime().toString(),
       period: '111'
   };
   list.push(tf);
   return list;
}

addCb = (data) => {};
modifyCb = (data) => {};
deleteCb = (data) => {};

  constructor(private formBuilder: FormBuilder,private toastMessageService:CommonService.ToastMessageService) {
    super(formBuilder,toastMessageService);
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
      const {id, name, paidTuition, shouldPaidTuition, arrearage, date, period} = this.$table.bootstrapTable('getSelections', null)[0];
      this.form.setValue({
        id: id,
        name: name,
        paidTuition: paidTuition,
        shouldPaidTuition: shouldPaidTuition,
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
    'paidTuition': [ '', [
        Validators.required,
        Validators.pattern(/(^\d+$)|(^\d+\.\d{0,}$)/),
        Validators.min(0)
       ]],
       'shouldPaidTuition': [ '', [
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

interface IStudentFinance {
    id: string;
    name: string;
    paidTuition: number;
    shouldPaidTuition: number;
    arrearage: number;
    date: string;
    period: string;
}
