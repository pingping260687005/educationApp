import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateRex } from '../validate-register';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  private modal: JQuery<HTMLElement> = null;
  private addModifyDialogTitle = '';
  private isModifyBtnDisabled = true;
  private isDeleteBtnDisabled = true;
  private isAdd = true;
  private addOrModifyRowData: User = {
    id: null,
    username: '',
    psd: '',
    authority: ''
  };


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
      'required': '请填写用户名'
    },
    'userPsd': {
      'required': '请填写密码'
    },
    'userPsdRepeat': {
      'required': '请确认密码'
    }
  };
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.modal = $('#addOrModifyModal');
    this.modal.on('hide.bs.modal', () => {
      this.addOrModifyRowData = {
        id: null,
        username: '',
        psd: '',
        authority: ''
      };
      this.modal.find('#psdConfirmInput').val('');
    });
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
      psd: '123',
      authority: '可读/可写'
    };
    const user2: User = {
      id: '2',
      username: 'root',
      psd: '123',
      authority: '只读'
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
    this.isAdd = isAdd;
    if (isAdd) {
      this.addModifyDialogTitle = '新增用户';
    } else {
      this.addModifyDialogTitle = '修改用户';
      this.addOrModifyRowData = $('#userMngTable').bootstrapTable('getSelections', null)[0]; // 修改只能是一条数据，所以直接用第一个
      this.modal.find('#psdConfirmInput').val(this.addOrModifyRowData.psd);
    }
    this.modal.modal('show');
  }

  private buildForm() {
    // 通过 formBuilder构建表单
    this.userForm = this.formBuilder.group({
      'userName': ['', [
        Validators.required
      ]],
      'authority': ['',[
        Validators.required
      ]],
      'userPsd': ['', [
        Validators.required
      ]],
      'userPsdRepeat': ['', [
        Validators.required
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
  onSubmit() {
    if(this.addOrModifyRowData){
      let unfinished = false;
      Object.keys(this.addOrModifyRowData).forEach(key => {
        if(!this.addOrModifyRowData[key] && key !== 'id'){
          unfinished = true;
        }
      });
      if(unfinished){
        document.dispatchEvent(new CustomEvent('show-toast-error', {
          detail: {
            msg: '输入信息不完整'
          }
        }));
        return;
      }
    }
   if(this.modal.find('#psdConfirmInput').val() !== this.addOrModifyRowData.psd) {
    document.dispatchEvent(new CustomEvent('show-toast-error', {
      detail: {
        msg: '两次密码不一致，请重新输入'
      }
    }));
    return;
   }
    if(this.isAdd) {
      $('#userMngTable').bootstrapTable('append', this.addOrModifyRowData);
    } else {
      $('#userMngTable').bootstrapTable('updateByUniqueId', this.addOrModifyRowData.id, this.addOrModifyRowData);
    }
    this.modal.modal('hide');
  }

  removeItems() {
    const selections = $('#userMngTable').bootstrapTable('getSelections', null).map((x) => {
      return x.id;
    });
    selections.forEach(x => {
      $('#userMngTable').bootstrapTable('removeByUniqueId', x);
    });
    this.updateToolbarIconsStatus();
    document.dispatchEvent(new CustomEvent('show-toast-success', {
      detail: {
        msg: '删除成功'
      }
    }));
  }

  ngOnDestroy() {
    $('#userMngTable').bootstrapTable('destroy');
  }

}
