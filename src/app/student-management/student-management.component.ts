import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Http } from '@angular/http';
// import 'rxjs/Rx';
import { Observable, from } from 'rxjs/index';
import { StudentService } from './student.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { isNumberValidator } from '../shared/is-number-validation.directive';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {
  private addModifyDialogTitle = '';
  private isModifyBtnDisabled = true;
  private isDeleteBtnDisabled = true;
  private isAdd = true;
   // 定义表单
   private modal;
   private form;
   private formErrors = {
    studentNum: '',
    name: '',
    sex: '',
    age: '',
    phone: '',
    parentPhone: '',
    address: '',
    course: ''
  };
 // 为每一项表单验证添加说明文字
 validationMessage = {
  'studentNum': {
    'required': '请填写学号'
  },
  'name': {
    'required': '请填写姓名'
  },
  'sex': {
    'required': '请填写性别'
  },
  'age': {
    'required': '请填写年龄',
    'isNotNumber': '请输入数字'
  },
  'phone': {
    'required': '请填写手机'
  },
  'parentPhone': {
    'required': '请填写父母手机'
  },
  'address': {
    'required': '请填写地址'
  },
  'course': {
    'required': '请填写课程'
  }
};
private addOrModifyRowData: Student = {
  id: null,
 studentNum: '',
 name: '',
 sex: '',
 age: null,
 phone: '',
 parentPhone: '',
 address: '',
 course: ''
};

  constructor(private http: Http, private studentService: StudentService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    // 真正的发请求取数据
    // this.setAllStudents();
    this.buildForm();
    this.modal = $('#addOrModifyModal');
    this.modal.on('hide.bs.modal', () => {
      this.addOrModifyRowData = {
        id: null,
        studentNum: '',
        name: '',
        sex: '',
        age: null,
        phone: '',
        parentPhone: '',
        address: '',
        course: ''
      };
      this.form.reset(this.addOrModifyRowData);
    });
  }

  setAllStudents() {
    this.studentService.getAllStudent().subscribe((students: Student[]) => {
      $('#studentMngTable').bootstrapTable('load', students);
    });
  }

  private buildForm() {
    // 通过 formBuilder构建表单
    this.form = this.formBuilder.group({ 
      'studentNum': ['', [
        Validators.required
      ]],
      'name': ['',[
        Validators.required
      ]],
      'sex': ['', [
        Validators.required
      ]],
      'age': ['', [
        Validators.required,
        isNumberValidator()
      ]],
      'phone': ['', [
        Validators.required
      ]],
      'parentPhone': ['', [
        Validators.required
      ]],
      'address': ['', [
        Validators.required
      ]],
      'course': ['', [
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
    setTimeout(() => {
      if(this.addOrModifyRowData.name && this.addOrModifyRowData.sex 
        && this.addOrModifyRowData.age && this.addOrModifyRowData.phone
        && this.addOrModifyRowData.parentPhone && this.addOrModifyRowData.address
        && this.addOrModifyRowData.course){
        $('#submit-btn').removeClass('disabled');
      }
      Object.keys(this.formErrors).forEach((key)=>{
        if(this.formErrors[key]){
          $('#submit-btn').addClass('disabled');
        }
      });
    }, 0);
    
  }

  ngAfterViewInit() {
    $('#studentMngTable').bootstrapTable({
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
        field: 'studentNum',
        title: '学号',
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
        field: 'parentPhone',
        title: '父母手机',
        sortable: true
      }, {
        field: 'address',
        title: '地址',
        sortable: true
      }, {
        field: 'videoId',
        title: '视频页',
        sortable: true
      }],
      data: this.getStudentList(),
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

  private getStudentList(): Student[] {
    //////// hard code////////////////
    const studentList: Student[] = [];
    let student: Student;
    for (let i = 0; i < 100; i++) {
      student = {
        id: i.toString(),
        studentNum: i.toString(),
        name: '随机 ' + i,
        sex: i % 2 === 0 ? '男' : '女',
        age: Math.floor(Math.random() * 100),
        phone: '13992288771',
        parentPhone: '13992288771',
        address: '丹阳市黄金路25弄16号201室',
        course: "xxx"
      };
      studentList.push(student);
    }
    return studentList;
  }

  private showModal(isAdd: boolean) {
    this.isAdd = isAdd;
    const modal = $('#addOrModifyModal');
    if (isAdd) {
      this.addModifyDialogTitle = '添加学生信息';
      $('#submit-btn').addClass('disabled');
    } else {
      this.addModifyDialogTitle = '修改学生信息';
      this.addOrModifyRowData = $('#studentMngTable').bootstrapTable('getSelections', null)[0]; // 修改只能是一条数据，所以直接用第一个
      $('#submit-btn').removeClass('disabled');
    }
    modal.modal('show');
  }

  private updateToolbarIconsStatus() {
    const selectionsLength = $('#studentMngTable').bootstrapTable('getSelections', null).length;
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
    const table = $('#studentMngTable');
    const selections = table.bootstrapTable('getSelections', null);
    const deleteStudents: number[] = selections.map(({id}) => id);
    $('#deleteBtn').addClass('disabled');
    // post a request to delete students
    deleteStudents.forEach(id => table.bootstrapTable('removeByUniqueId', id));
    this.studentService.deleteStudents(deleteStudents).subscribe((res: any) => {
      if (res.message === 'succeed') {
        deleteStudents.forEach(id => table.bootstrapTable('removeByUniqueId', id));
      }
    });
    document.dispatchEvent(new CustomEvent('show-toast-success', {
      detail: {
        msg: '删除成功'
      }
    }));
    $("#confirmDeleteDialog").modal("hide");
  }

  onSubmit () {
    const table = $('#studentMngTable');
    if(this.addOrModifyRowData){
      let unfinished = false;
      Object.keys(this.addOrModifyRowData).forEach(key => {
        if(!this.addOrModifyRowData[key] && this.addOrModifyRowData[key] !== 0 && key !== 'id'){
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
      this.addOrModifyRowData.id = Math.random() + ''; // TO be deleted
      $('#studentMngTable').bootstrapTable('insertRow',{index:0,row:this.addOrModifyRowData} );
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
      this.form.value.id = this.addOrModifyRowData.id;
      $('#studentMngTable').bootstrapTable('updateByUniqueId', this.addOrModifyRowData.id, this.addOrModifyRowData);
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
      document.dispatchEvent(new CustomEvent('show-toast-success', {
        detail: {
          msg: '修改成功'
        }
      }));
    }
    const modal = $('#addOrModifyModal');
    modal.modal('hide');
  }

  openConfirmDeleteDialog(){
    $("#confirmDeleteDialog").modal("show");
  }

  ngOnDestroy() {
    $('#studentMngTable').bootstrapTable('destroy');
  }

}

