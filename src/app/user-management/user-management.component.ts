import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateRex } from '../validate-register';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  private addModifyDialogTitle = '';
  private isModifyBtnDisabled = true;
  private isDeleteBtnDisabled = true;

  // 定义表单
  private userForm;

  private formErrors = {
    userName: '',
    userPsd: '',
    userPsdRepeat: ''
  };

  // 为每一项表单验证添加说明文字
  validationMessage = {
    'userName': {
      'minlength': '用户名长度最少为3个字符',
      'maxlength': '用户名长度最多为10个字符',
      'required': '请填写用户名',
      'notdown': '用户名不能以下划线开头',
      'only': '用户名只能包含数字、字母、下划线'
    },
    'userPsd': {
      'minlength': '密码长度最少为6个字符',
      'maxlength': '密码长度最多为10个字符',
      'required': '请填写密码',
      'only': '密码只能包含数字、字母、下划线'
    },
    'userPsdRepeat': {
      'minlength': '密码长度最少为6个字符',
      'maxlength': '密码长度最多为10个字符',
      'required': '请再次确认密码',
      'only': '密码只能包含数字、字母、下划线'
    }
  };
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();

  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    $('#userMngTable').bootstrapTable({
      columns: [
        {
          checkbox: true,
          visiable: true
        },
        {
          // unshown
          field: 'id',
          title: 'Item ID',
          visible: false
        }, {
          field: 'username',
          title: '用户名'
        }, {
          // unshown
          field: 'password',
          title: '密码',
          visible: false
        }, {
          field: 'authority',
          title: '权限'
        }],
      data: this.getUserList(),
      search: true,
      pagination: true,
      pageSize: 10,
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
  private getUserList(): User[] {
    //////// hard code////////////////
    const userList: User[] = [];
    const user1: User = {
      id: '1',
      username: 'admin',
      password: '',
      authority: 'read-write'
    };
    const user2: User = {
      id: '2',
      username: 'root',
      password: '',
      authority: 'read-write'
    };
    userList.push(user1);
    userList.push(user2);
    return userList;
  }

  private updateToolbarIconsStatus() {
    const selectionsLength = $('#userMngTable').bootstrapTable('getSelections', null).length;
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

  private showModal(isAdd: boolean) {
    const modal = $('#addOrModifyModal');
    let selection = null;
    if (isAdd) {
      this.addModifyDialogTitle = '添加用户';
    } else {
      this.addModifyDialogTitle = '修改用户';
      selection = $('#userMngTable').bootstrapTable('getSelections', null)[0]; // 修改只能是一条数据，所以直接用第一个
    }
    modal.find('.studentNum').val(selection ? selection['studentNum'] : '');
    modal.find('.phone').val(selection ? selection['phone'] : '');
    modal.find('.name').val(selection ? selection['name'] : '');
    modal.find('.parentPhone').val(selection ? selection['parentPhone'] : '');
   
    modal.modal('show');
  }

  private buildForm() {
    // 通过 formBuilder构建表单
    this.userForm = this.formBuilder.group({
      /* 为 username 添加3项验证规则：
      * 1.必填， 2.最大长度为10， 3.最小长度为3， 4.不能以下划线开头， 5.只能包含数字、字母、下划线
      * 其中第一个空字符串参数为表单的默认值
      */
      'userName': ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(3),
        validateRex('notdown', /^(?!_)/),
        validateRex('only', /^[1-9a-zA-Z_]+$/)
      ]],
      'userPsd': ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(6),
        validateRex('notdown', /^(?!_)/),
        validateRex('only', /^[1-9a-zA-Z_]+$/)
      ]],
      'userPsdRepeat': ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(6),
        validateRex('notdown', /^(?!_)/),
        validateRex('only', /^[1-9a-zA-Z_]+$/)
      ]]
    });

    // 每次表单数据发生变化的时候更新错误信息
    this.userForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    // 初始化错误信息
    this.onValueChanged();
  }

  // 每次数据发生改变时触发此方法
  onValueChanged(data?: any) {
    // 如果表单不存在则返回
    if (!this.userForm) { return; }
    // 获取当前的表单
    const form = this.userForm;

    // 遍历错误消息对象
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // 清空当前的错误消息
      this.formErrors[field] = '';
      // 获取当前表单的控件
      const control = form.get(field);

      // 当前表单存在此空间控件 && 此控件没有被修改 && 此控件验证不通过
      if (control && control.dirty && !control.valid) {
        // 获取验证不通过的控件名，为了获取更详细的不通过信息
        const messages = this.validationMessage[field];
        // 遍历当前控件的错误对象，获取到验证不通过的属性
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          // 把所有验证不通过项的说明文字拼接成错误消息
          this.formErrors[field] += messages[key] + '\n';
        }
      }
    }
  }
  onSubmit() { }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    $('#userMngTable').bootstrapTable('destroy');
  }

}
