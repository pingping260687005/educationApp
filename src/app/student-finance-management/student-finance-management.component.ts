import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateRex } from '../validate-register';

@Component({
  selector: 'app-student-finance-management',
  templateUrl: './student-finance-management.component.html',
  styleUrls: ['./student-finance-management.component.css']
})
export class StudentFinanceManagementComponent implements OnInit {
    private addModifyDialogTitle = '';
    private isModifyBtnDisabled = true;
    private isDeleteBtnDisabled = true;

    // 定义表单

    private isAdd = true;
    private modal;
  private form;
  private formErrors = {
    name: '',
    paidSalary: '',
    shouldPaidSalary: '',
    arrearage: '',
    date: '',
    period: ''
  };

  // 为每一项表单验证添加说明文字
 validationMessage = {
  'name': {
    'required': '请填写姓名'
  },
  'paidSalary': {
    'required': '请填写已付费用'
  },
  'shouldPaidSalary': {
    'required': '请填写应付费用'
  },
  'arrearage': {
    'required': '请填写欠款',
  },
  'date': {
    'required': '请填写收费日期',
  },
  'period': {
    'required': '请填写间隔',
  }
};

/**
 *   studentId: string;
    paidSalary: number;
    shouldPaidSalary: number;
    arrearage: number;
    date: string;
    period: string;
 */
private addOrModifyRowData: IStudentFinance = {
 id: null,
 name: '',
 paidTuition: null,
 shouldPaidTuition: null,
 arrearage: null,
 date: '',
 period: ''
};
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.modal = $('#addOrModifyModal');
    this.modal.on('hide.bs.modal', () => {
      this.addOrModifyRowData = {
        id: null,
        name: '',
        paidTuition: null,
        shouldPaidTuition: null,
        arrearage: null,
        date: '',
        period: ''
      };
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    $('#studentFinanceMngTable').bootstrapTable({
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
      ],
        data: this.getData(),
        search: true,
        pagination: true,
        pageSize: 15,
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
  private getData(): IStudentFinance[] {
    //////// hard code////////////////
    const dataList: IStudentFinance[] = [];
    const tf: IStudentFinance = {
        id: '1',
        name: 'XXX',
        paidSalary: 1000,
        shouldPaidSalary: 2000,
        arrearage: 1000,
        date: new Date().getTime().toString(),
        period: '111'
    };
   dataList.push(tf);
    return dataList;
}

private updateToolbarIconsStatus() {
    const selectionsLength = $('#studentFinanceMngTable').bootstrapTable('getSelections', null).length;
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
    const modal = $('#addOrModifyModal');
    let selection = null;
    if (isAdd) {
      this.addModifyDialogTitle = '添加教师财务';
    } else {
      this.addModifyDialogTitle = '修改教师财务';
      selection = $('#studentFinanceMngTable').bootstrapTable('getSelections', null)[0]; // 修改只能是一条数据，所以直接用第一个
      this.addOrModifyRowData = selection;
    }
    modal.modal('show');
  }

  private buildForm() {
       // 通过 formBuilder构建表单
 this.form = this.formBuilder.group({
    'name': [ '', [
     Validators.required
    ]],
    'paidTuition': [ '', [
        Validators.required,
        validateRex('isNumber', /^[0-9]*$/)
       ]],
       'shouldPaidTuition': [ '', [
        Validators.required,
   validateRex('isNumber', /^[0-9]*$/)
       ]],
       'arrearage': [ '', [
        Validators.required,
   validateRex('isNumber', /^[0-9]*$/)
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
     this.formErrors[field] += messages[key] + '\n';
     }
    }
    }
   }
   onSubmit () {
    const table = $('#studentMngTable');
    if(this.addOrModifyRowData){
      let unfinished = false;
      Object.keys(this.addOrModifyRowData).forEach(key => {
        if((!this.addOrModifyRowData[key] && this.addOrModifyRowData[key] !== 0 && key !== 'id'){
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
    if (this.isAdd) {
    
      // add
      // this.studentService.addStudent(this.form.value).subscribe(res => {
      //   if ( res.message === 'succeed') {

      //     // append is append to the bottom, prepend is appending to the top.
      //     table.bootstrapTable('append', {index: 1, row: res});
      //   } else {
      //     // res.message === 'failed'
      //     // TODO:  error
      //     window.alert('add student failed');
      //   }
      // });
    } else {
      // edit
      this.form.value.id = this.addOrModifyRowData.id;
      // this.studentService.updateStudent(this.form.value).subscribe(res => {
      //   if ( res.message === 'succeed') {
      //     const index = $('#studentMngTable .selected').attr('data-index');
      //     $('#studentMngTable').bootstrapTable('updateRow', {index: Number(index), row: res});
      //   } else {
      //     // res.message === 'failed'
      //     // TODO:  error
      //     window.alert('add student failed');
      //   }
      // });
    }
    const modal = $('#addOrModifyModal');
    modal.modal('hide');
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy () {
    $('#userMngTable').bootstrapTable('destroy');
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
