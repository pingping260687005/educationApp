import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Http } from '@angular/http';
// import 'rxjs/Rx';
import { Observable, from } from 'rxjs/index';
import { StudentService } from './student.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
  private editId;
  private studentForm = new FormGroup({
    studentNum: new FormControl(''),
    name: new FormControl(''),
    sex: new FormControl(''),
    age: new FormControl(''),
    phone: new FormControl(''),
    parentPhone: new FormControl(''),
    address: new FormControl(''),
    course: new FormControl('')
  });

  constructor(private http: Http, private studentService: StudentService) { }
  ngOnInit() {
    // 真正的发请求取数据
    this.setAllStudents();

    $(window).resize(() => {
      $('#studentMngTable').bootstrapTable('resetView', {height: $(window).height() - 76 - 20});
    });
  }

  setAllStudents() {
    this.studentService.getAllStudent().subscribe((students: Student[]) => {
      $('#studentMngTable').bootstrapTable('load', students);
    });
  }

  ngAfterViewInit() {
    const tableHeight = $('.wrapper').height();
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
      height: tableHeight - 20,
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
        address: '丹阳市黄金路25弄16号201室'
      };
      studentList.push(student);
    }
    return studentList;
  }

  private showModal(isAdd: boolean) {
    this.isAdd = isAdd;
    const modal = $('#addOrModifyModal');
    let selection = null;
    if (isAdd) {
      this.addModifyDialogTitle = '添加学生信息';
    } else {
      this.addModifyDialogTitle = '修改学生信息';
      selection = $('#studentMngTable').bootstrapTable('getSelections', null)[0]; // 修改只能是一条数据，所以直接用第一个
      this.editId = selection['id'];
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
    this.studentService.deleteStudents(deleteStudents).subscribe((res: any) => {
      if (res.message === 'succeed') {
        deleteStudents.forEach(id => table.bootstrapTable('removeByUniqueId', id));
      }
    });
  }

  onSubmit () {
    const table = $('#studentMngTable');
    if (this.isAdd) {
      // add
      this.studentService.addStudent(this.studentForm.value).subscribe(res => {
        if ( res.message === 'succeed') {

          // append is append to the bottom, prepend is appending to the top.
          table.bootstrapTable('append', {index: 1, row: res});
        } else {
          // res.message === 'failed'
          // TODO:  error
          window.alert('add student failed');
        }
      });
    } else {
      // edit
      this.studentForm.value.id = this.editId;
      this.studentService.updateStudent(this.studentForm.value).subscribe(res => {
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

  ngOnDestroy() {
    $('#studentMngTable').bootstrapTable('destroy');
  }

}

