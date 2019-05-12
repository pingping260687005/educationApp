import { from } from 'rxjs/index';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { BaseView } from '../baseView';
import { async } from 'q';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent extends BaseView implements OnInit {
   formErrors = {
    userName: '',
    userPsd: '',
    userPsd2: ''
  };

  columns = [
    {
      checkbox: true,
      visiable: true
    },
   {
      field: 'userName',
      title: '用户名'
    }, {
      // unshown
      field: 'userPsd',
      title: '密码',
      visible: false
    }, {
      field: 'authority',
      title: '权限'
    }];

  // 为每一项表单验证添加说明文字
  validationMessage = {
    'userName': {
      'required': '请填写用户名'
    },
    'userPsd': {
      'required': '请填写密码',
      'psdConfirm': '两次密码输入不一致'
    },
    'userPsd2': {
      'required': '请确认密码',
      'psdConfirm': '两次密码输入不一致'
    }
  };

  listCb = () => {
        //////// hard code////////////////
     const list: User[] = [];
     const user1: User = {
       id: Math.random() + '',
       userName: 'admin',
       userPsd: '123',
       authority: '可读/可写'
     };
     const user2: User = {
       id: Math.random() + '',
       userName: 'root',
       userPsd: '123',
       authority: '只读'
     };
     list.push(user1);
     list.push(user2);
     return list;
  }

  addCb = (data) => {};

  modifyCb = (data) => {};

  deleteCb = (data) => {};
  constructor(private formBuilder: FormBuilder) {
    super(formBuilder);
  }

  ngOnInit() {
    this.initView();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.initTable();
  }

   buildForm() {
    const psdValidate = (control: AbstractControl) => {
      if (this.form && control.value && this.form.value.userPsd2 && control.value !== this.form.value.userPsd2) {
        return {'psdConfirm': {value: control.value}};
      } else {
        return null;
      }
    };

    const psd2Validate = (control: AbstractControl) => {
      if (this.form && this.form.value.userPsd && control.value && this.form.value.userPsd !== control.value) {
        return {'psdConfirm': {value: control.value}};
      } else {
        return null;
      }
    };

    // 通过 formBuilder构建表单
    this.form = this.formBuilder.group({
      'id': ['', [
      ]],
      'userName': ['', [
        Validators.required
      ]],
      'authority': ['', [
        Validators.required
      ]],
      'userPsd': ['', [
        Validators.required,
        psdValidate
      ]],
      'userPsd2': ['', [
        Validators.required,
        psd2Validate
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
    if (isAdd) {
      this.addModifyDialogTitle = '新增用户';
      $('#submit-btn').addClass('disabled');
    } else {
      this.addModifyDialogTitle = '修改用户';
      const {id, userName, userPsd, authority} = this.$table.bootstrapTable('getSelections', null)[0];
      this.form.setValue({
        id: id,
        userName: userName,
        userPsd: userPsd,
        userPsd2: userPsd,
        authority: authority
      }); // 修改只能是一条数据，所以直接用第一个

    }
    this.modal.modal('show');
  }
}

