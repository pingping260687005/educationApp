import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, from } from 'rxjs/index';

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
  constructor(private http: Http) {
    // 用http请求
    this.dataSource = this.http.get('/api/teachers');
    // .map(res=> res.json());

  }

  ngOnInit() {
    // 真正的发请求取数据
    this.dataSource.subscribe((res) => {
      // get real data
      const teachers: Teacher[] = JSON.parse(res['_body']);
      // set data
      // $('#teacherMngTable').bootstrapTable('load', teachers);
    });
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
    const modal = $('#addOrModifyModal');
    let selection = null;
    if (isAdd) {
      this.addModifyDialogTitle = '添加学生信息';
    } else {
      this.addModifyDialogTitle = '修改学生信息';
      selection = $('#teacherMngTable').bootstrapTable('getSelections', null)[0]; // 修改只能是一条数据，所以直接用第一个
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
