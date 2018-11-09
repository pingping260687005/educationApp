import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Http } from '@angular/http';
// import 'rxjs/Rx';
import { Observable, from } from 'rxjs/index';
import { StudentService } from './student.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent implements OnInit {
  dataSource: Observable<any>;
  private addModifyDialogTitle = '';
  private isModifyBtnDisabled = true;
  private isDeleteBtnDisabled = true;
  studentForm = new FormGroup({
    studentNumber: new FormControl(''),
    telephone: new FormControl(''),
  });
    
  constructor(private http: Http, private studentService: StudentService) {
    // 用http请求
    //this.dataSource = this.http.get('/api/students');
    // .map(res=> res.json());

  }

  ngOnInit() {
    // 真正的发请求取数据
    // this.dataSource.subscribe((res) => {
    //   // get real data
    //   const students: Student[] = JSON.parse(res['_body']);
    //   // set data
    //   // $('#studentMngTable').bootstrapTable('load', students);
    // });
    this.studentService.getAllStudent().subscribe((students:Student[])=>{
      console.table(students);
      $('#studentMngTable').bootstrapTable('load', students);
    });

    $(window).resize(() => {
      $('#studentMngTable').bootstrapTable('resetView', {height: $(window).height() - 76 - 20});
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
    const modal = $('#addOrModifyModal');
    let selection = null;
    if (isAdd) {
      this.addModifyDialogTitle = '添加学生信息';
    } else {
      this.addModifyDialogTitle = '修改学生信息';
      selection = $('#studentMngTable').bootstrapTable('getSelections', null)[0]; // 修改只能是一条数据，所以直接用第一个
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
    let deleteStudents:number[] = [];
    for (let i = 0; i < selections.length; i++) {
      table.bootstrapTable('removeByUniqueId', selections[i].id);
      deleteStudents.push(selections[i].id)
    }
    $('#deleteBtn').addClass('disabled');
    // post a request to delete students
    this.studentService.deleteStudents(deleteStudents).subscribe(res=>console.log(res));
  }


  ngOnDestroy() {
    $('#studentMngTable').bootstrapTable('destroy');
  }

}

