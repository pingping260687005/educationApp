import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-finance-management',
  templateUrl: './teacher-finance-management.component.html',
  styleUrls: ['./teacher-finance-management.component.scss']
})
export class TeacherFinanceManagementComponent implements OnInit {
    private addModifyDialogTitle = '';
    private isModifyBtnDisabled = true;
    private isDeleteBtnDisabled = true;


    private isAdd = true;
    private modal;
    // 定义表单

    private form;
    private formErrors = {
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
    /**
     *    name: string;
    paidSalary: number;
    unPaidSalary: number;
    arrearage: number;
    date: string;
    period: string;
     */
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.modal = $('#addOrModifyModal');
    this.modal.on('hide.bs.modal', () => {
      this.form.reset();
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
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
  private getData(): ITeacherFinance[] {
    //////// hard code////////////////
    const dataList: ITeacherFinance[] = [];
    const tf: ITeacherFinance = {
        id: '1',
        name: 'XXX',
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
    this.isAdd = isAdd;
    const modal = $('#addOrModifyModal');
    let selection = null;
    if (isAdd) {
      this.addModifyDialogTitle = '添加教师财务';
      $('#submit-btn').addClass('disabled');
    } else {
      this.addModifyDialogTitle = '修改教师财务';
      let {id,name,paidSalary,unPaidSalary,arrearage,date,period} = $('#teacherFinanceMngTable').bootstrapTable('getSelections', null)[0];
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

  private buildForm() {
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
    if(form.invalid){
      $('#submit-btn').addClass('disabled');
    }else{
      $('#submit-btn').removeClass('disabled');
    }
   
   }
   onSubmit () {
    const table = $('#studentMngTable');
    if (this.isAdd) {
      document.dispatchEvent(new CustomEvent('show-toast-success', {
        detail: {
          msg: '添加成功'
        }
      }));
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
      document.dispatchEvent(new CustomEvent('show-toast-success', {
        detail: {
          msg: '修改成功'
        }
      }));
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
    $('#teacherFinanceMngTable').bootstrapTable('destroy');
  }

  removeItems() {
    const selections = $('#teacherFinanceMngTable').bootstrapTable('getSelections', null).map((x) => {
      return x.id;
    });
    selections.forEach(x => {
      $('#teacherFinanceMngTable').bootstrapTable('removeByUniqueId', x);
    });
    this.updateToolbarIconsStatus();
    document.dispatchEvent(new CustomEvent('show-toast-success', {
      detail: {
        msg: '删除成功'
      }
    }));
    $("#confirmDeleteDialog").modal("hide");
  }

  openConfirmDeleteDialog(){
    $("#confirmDeleteDialog").modal("show");
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
