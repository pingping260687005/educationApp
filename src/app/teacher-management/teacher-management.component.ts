import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, from } from 'rxjs/index';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-management',
  templateUrl: './teacher-management.component.html',
  styleUrls: ['./teacher-management.component.css']
})
export class TeacherManagementComponentComponent implements OnInit {
  dataSource: Observable<any>;
  private addModifyDialogTitle = '';
  private isModifyBtnDisabled = true;
  private isDeleteBtnDisabled = true;
  private isAdd = true;
  private modal;
  private form;
  private formErrors = {
    teacherNum: '',
    name: '',
    sex: '',
    age: '',
    phone: '',
    address: '',
    issueDate: '',
    fulltime: ''
  };

  // 为每一项表单验证添加说明文字
 validationMessage = {
  'name': {
    'required': '请填写姓名'
  },
  'teacherNum': {
    'required': '请填写工号'
  },
  'sex': {
    'required': '请填写性别'
  },
  'age': {
    'required': '请填写年龄',
  },
  'phone': {
    'required': '请填写电话'
  },
  'address': {
    'required': '请填写地址'
  },
  'issueDate': {
    'required': '请填写入职日期'
  },
  'fulltime': {
    'required': '请填写是否全职'
  }
};
private addOrModifyRowData: Teacher = {
 id: null,
 name: null,
 teacherNum: null,
 issueDate: null,
 age: null,
 address: null,
 sex: null,
 fullTime: null,
 phone: null
};
  constructor(private http: Http,private formBuilder: FormBuilder) {
    // 用http请求
    // this.dataSource = this.http.get('/api/teachers');
    // .map(res=> res.json());

  }

  ngOnInit() {
    this.buildForm();
    // 真正的发请求取数据
    // this.dataSource.subscribe((res) => {
    //   // get real data
    //   const teachers: Teacher[] = JSON.parse(res['_body']);
    //   // set data
    //   // $('#teacherMngTable').bootstrapTable('load', teachers);
    // });
    this.modal = $('#addOrModifyModal');
    this.modal.on('hide.bs.modal', () => {
      this.addOrModifyRowData = {
        id: null,
        name: null,
        teacherNum: null,
        issueDate: null,
        age: null,
        address: null,
        sex: null,
        fullTime: null,
        phone: null
      };
    });
  }

  private buildForm() {
    // 通过 formBuilder构建表单
    this.form = this.formBuilder.group({ 
      'name': ['', [
        Validators.required
      ]],
      'teacherNum': ['',[
        Validators.required
      ]],
      'issueDate': ['', [
        Validators.required
      ]],
      'age': ['', [
        Validators.required,
      ]],
      'sex': ['', [
        Validators.required
      ]],
      'address': ['', [
        Validators.required
      ]],
      'fullTime': ['', [
        Validators.required
      ]],
      'phone': ['', [
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

  ngAfterViewInit() {
    $('#teacherMngTable').bootstrapTable({
      columns: [{
        checkbox: true,
        visiable: true
      },
      {
        field: 'id',
        title: 'Item ID',
        visible: false,
        sortable: true
      }, {
        field: 'teacherNum',
        title: '工号',
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
        field: 'address',
        title: '地址',
        sortable: true
      }, {
        field: 'issueDate',
        title: '入职日期',
        sortable: true
      }, {
        field: 'fullTime',
        title: '兼职/全职',
        sortable: true
      }, {
        field: 'course',
        title: '课程',
        sortable: true
      }],
      data: this.getStudentList(),
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

  private getStudentList(): Teacher[] {
    //////// hard code////////////////
    const studentList: Teacher[] = [];
    let student: Teacher;
    for (let i = 0; i < 100; i++) {
      student = {
        id: i.toString(),
        teacherNum: i.toString(),
        name: '随机 ' + i,
        sex: i % 2 === 0 ? '男' : '女',
        age: Math.floor(Math.random() * 100),
        phone: '13992288771',
        address: '丹阳市黄金路25弄16号201室',
        issueDate: '2018-4-4',
        fullTime: true
      };
      studentList.push(student);
    }
    return studentList;
  }

  private showModal(isAdd: boolean) {
    this.isAdd = isAdd;
    const modal = $('#addOrModifyModal');
    if (isAdd) {
      this.addModifyDialogTitle = '添加教师';
    } else {
      this.addModifyDialogTitle = '修改教师';
      this.addOrModifyRowData = $('#teacherMngTable').bootstrapTable('getSelections', null)[0]; // 修改只能是一条数据，所以直接用第一个
    }
    modal.find('.address').attr('title', this.addOrModifyRowData ? this.addOrModifyRowData['address'] : '');
    modal.modal('show');
  }

  private updateToolbarIconsStatus() {
    const selectionsLength = $('#teacherMngTable').bootstrapTable('getSelections', null).length;
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

  private removeItems() {
    const table = $('#teacherMngTable');
    const selections = table.bootstrapTable('getSelections', null);
    for (let i = 0; i < selections.length; i++) {
      table.bootstrapTable('removeByUniqueId', selections[i].id);
    }
    $('#deleteBtn').addClass('disabled');
  }

  ngOnDestroy() {
    $('#teacherMngTable').bootstrapTable('destroy');
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
      this.studentService.updateStudent(this.form.value).subscribe(res => {
        if ( res.message === 'succeed') {
          const index = $('#studentMngTable .selected').attr('data-index');
          $('#studentMngTable').bootstrapTable('updateRow', {index: Number(index), row: res});
        } else {
          // res.message === 'failed'
          // TODO:  error
          window.alert('add student failed');
        }
      });
    }
    const modal = $('#addOrModifyModal');
    modal.modal('hide');
  }

}

interface Teacher {
  id: string;
  teacherNum: string;
  name: string;
  sex: string;
  age: number;
  phone: string;
  address: string;
  issueDate: string;
  fullTime: boolean;
}
