import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateRex } from '../validate-register';

@Component({
  selector: 'app-teacher-finance-management',
  templateUrl: './teacher-finance-management.component.html',
  styleUrls: ['./teacher-finance-management.component.css']
})
export class TeacherFinanceManagementComponent implements OnInit {
    private addModifyDialogTitle = '';
    private isModifyBtnDisabled = true;
    private isDeleteBtnDisabled = true;

    // 定义表单
    private teacherFinanceForm;

    private formErrors = {
      teacherFinanceName: '',
      teacherFinancePsd: '',
      teacherFinancePsdRepeat: ''
    };

    // 为每一项表单验证添加说明文字
validationMessage = {
    'teacherFinanceName': {
    'required': '请填写用户名',
    },
    'teacherFinancePsd': {
        'minlength': '密码长度最少为6个字符',
        'maxlength': '密码长度最多为10个字符',
        'required': '请填写密码',
        'only': '密码只能包含数字、字母、下划线'
        },
        'teacherFinancePsdRepeat': {
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
    const tableHeight = $('.wrapper').height();
    $('#teacherFinanceMngTable').bootstrapTable({
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
      ],
        data: this.getData(),
        height: tableHeight - 20,
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
  private getData(): ITeacherFinance[] {
    //////// hard code////////////////
    const dataList: ITeacherFinance[] = [];
    const tf: ITeacherFinance = {
        id: '1',
        teacherId: 'XXX',
        paidSalary: 1000,
        unPaidSalary: 2000,
        arrearage: 1000,
        date: new Date().getTime().toString(),
        period: '111'
    };
   dataList.push(tf);
    return dataList;
}

private updateToolbarIconsStatus() {
    const selectionsLength = $('#teacherFinanceMngTable').bootstrapTable('getSelections', null).length;
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
      selection = $('#teacherFinanceMngTable').bootstrapTable('getSelections', null)[0]; // 修改只能是一条数据，所以直接用第一个
    }
    modal.find('.studentNum').val(selection ? selection['studentNum'] : '');
    modal.find('.phone').val(selection ? selection['phone'] : '');
    modal.find('.name').val(selection ? selection['name'] : '');
    modal.find('.parentPhone').val(selection ? selection['parentPhone'] : '');
    modal.find('.age').val(selection ? selection['age'] : '');
    modal.find('.sex').val(selection ? selection['sex'] : '');
    modal.find('.address').val(selection ? selection['address'] : '');
    modal.find('.address').attr('title', selection ? selection['address'] : '');
    modal.modal('show');
  }

  private buildForm() {
       // 通过 formBuilder构建表单
 this.teacherFinanceForm = this.formBuilder.group({
    'teacherId': [ '', [
     Validators.required
    ]],
    'paidSalary': [ '', [
        Validators.required,
        validateRex('isNumber', /^[0-9]*$/)
       ]],
       'unPaidSalary': [ '', [
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
    this.teacherFinanceForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    // 初始化错误信息
    this.onValueChanged();
  }

  // 每次数据发生改变时触发此方法
onValueChanged(data?: any) {
    // 如果表单不存在则返回
    if (!this.teacherFinanceForm) { return; }
    // 获取当前的表单
    const form = this.teacherFinanceForm;

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
   onSubmit() {}
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy () {
    $('#userMngTable').bootstrapTable('destroy');
  }

}

interface ITeacherFinance {
    id: string;
    teacherId: string;
    paidSalary: number;
    unPaidSalary: number;
    arrearage: number;
    date: string;
    period: string;
}
