import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import * as CommonService from './common-service/commonService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class BaseView {
   modal: JQuery<HTMLElement> = null;
   addModifyDialogTitle = '';
   isModifyBtnDisabled = true;
   isDeleteBtnDisabled = true;
   isAdd = true;
   columns = [];
   $table = null;
   tableData = null;
  // 定义表单
   form: FormGroup;

   formErrors = {};
   listCb: Function;
   addCb: Function;
   modifyCb: Function;
   deleteCb: Function;
   private fb: FormBuilder;
   private messageService: CommonService.ToastMessageService;

  // 为每一项表单验证添加说明文字
  validationMessage = {};
  constructor(formBuilder: FormBuilder, toastMessageService: CommonService.ToastMessageService) {
    this.fb = formBuilder;
    this.messageService = toastMessageService;
  }

  initView() {
    this.buildForm();
    this.modal = $('#addOrModifyModal');
    this.modal.on('hide.bs.modal', () => {
      this.form.reset();
    });
  }

  initTable() {

    this.$table = $('#table');
    this.$table.bootstrapTable({
      columns: this.columns,
      data: this.tableData || [],
      search: true,
      pagination: true,
      pageSize: 10,
      pageList: ['10', '20', '50', '100'],
      classes: 'table table-hover',
      showColumns: true,
      uniqueId: 'id',
      data_locale: 'zh-CN',
      locale: 'zh-CN',
      smartDisplay: true,
      checkboxHeader: true,
      clickToSelect: true,
      toolbar: '#toolbar',
      iconSize: 'sm',
      onCheck: () => {
        this.updateToolbarIconsStatus();
      },
      onUncheck: () => {
        this.updateToolbarIconsStatus();
      }
    });
    this.updateToolbarIconsStatus();
    this.refreshTableData();
  }

  refreshTableData() {
    const p = new Promise((resolve, reject) => {
      try {
        resolve(this.listCb());
      } catch (error) {
        reject(error);
      }
     });
     p.then((res) => {
      this.tableData = res;
      this.$table.bootstrapTable('load', res);
    });
  }

   updateToolbarIconsStatus() {
    const selectionsLength = this.$table.bootstrapTable('getSelections', null).length;
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

   showModal(isAdd: boolean) {
    this.isAdd = isAdd;
    if (isAdd) {
      this.addModifyDialogTitle = this.addModifyDialogTitle || '新增';
      $('#submit-btn').addClass('disabled');
    } else {
      this.addModifyDialogTitle = this.addModifyDialogTitle || '修改';
      this.form.setValue(this.$table.bootstrapTable('getSelections', null)[0]); // 修改只能是一条数据，所以直接用第一个
    }
    this.modal.modal('show');
  }

   buildForm() {
    // 通过 formBuilder构建表单
    this.form = this.fb.group({});

    // 每次表单数据发生变化的时候更新错误信息
    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));

    // 初始化错误信息
    this.onValueChanged();
  }

  // 每次数据发生改变时触发此方法
  onValueChanged(data?: any) {
    // 如果表单不存在则返回
    if (!this.form) { return; }
    // 获取当前的表单
    const form = this.form;

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
          this.formErrors[field] = messages[key];
        }
      }
    }
    if (form.invalid) {
      $('#submit-btn').addClass('disabled');
    } else {
      $('#submit-btn').removeClass('disabled');
    }

  }
  onSubmit() {
    if (this.isAdd) {
      this.form.value.id = Math.random() + ''; // TO be deleted
      Promise.resolve(this.addCb(this.form.value)).then(() => {
        this.$table.bootstrapTable('insertRow', {index: 0, row: this.form.value} );
        this.messageService.showToastMessage('添加成功', CommonService.ToastMessageType.Success);
          this.modal.modal('hide');
      });
    } else {
      const index = $('#table .selected').attr('data-index');
      Promise.resolve(this.modifyCb(this.form.value)).then(() => {
        this.$table.bootstrapTable('updateRow', {index: Number(index), row: this.form.value});
        this.messageService.showToastMessage('修改成功', CommonService.ToastMessageType.Success);
      this.modal.modal('hide');
      });
    }
  }

  removeItems() {
    const ids = this.$table.bootstrapTable('getSelections', null).map((x) => {
      return x.id;
    });
    Promise.resolve(this.deleteCb(ids)).then(() => {
      ids.forEach(x => {
        this.$table.bootstrapTable('removeByUniqueId', x);
      });
      this.updateToolbarIconsStatus();
      this.messageService.showToastMessage('删除成功', CommonService.ToastMessageType.Success);
      $('#confirmDeleteDialog').modal('hide');
    });
  }

  openConfirmDeleteDialog() {
    $('#confirmDeleteDialog').modal('show');
  }

  ngOnDestroy() {
    this.$table.bootstrapTable('destroy');
  }

}

