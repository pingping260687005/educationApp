import { Component, OnInit } from '@angular/core';
//import { Observable } from 'rxjs';
import { Http } from "@angular/http";
//import 'rxjs/Rx'; 
import { Observable, from } from 'rxjs/index';

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
  constructor(private http: Http) {
    //用http请求
    this.dataSource = this.http.get('/api/products');
    //.map(res=> res.json());

  }

  ngOnInit() {

    // 真正的发请求取数据
    this.dataSource.subscribe((res) => {
      //res.json()

      //get real data
      console.log(res);


    });
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
        visible: false
      }, {
        field: 'studentNum',
        title: '学号'
      }, {
        field: 'name',
        title: '姓名'
      }, {
        field: 'sex',
        title: '性别'
      }, {
        field: 'age',
        title: '年龄'
      }, {
        field: 'phone',
        title: '手机'
      }, {
        field: 'parentPhone',
        title: '父母手机'
      }, {
        field: 'address',
        title: '地址'
      }, {
        field: 'videoId',
        title: '视频页'
      }],
      data: this.getStudentList(),
      search: true,
      pagination: true,
      pageSize: 15,
      idField: "id",
      uniqueId: "id",
      smartDisplay: true,
      checkboxHeader: true,
      clickToSelect: true,
      toolbar: "#toolbar",
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
    ////////hard code////////////////
    let studentList: Student[] = [];
    let student: Student;
    for (let i = 0; i < 100; i++) {
      student = {
        id: i.toString(),
        studentNum: i.toString(),
        name: "随机 " + i,
        sex: i % 2 === 0 ? "男" : "女",
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
    let modal = $("#addOrModifyModal");
    let selection = null;
    if (isAdd) {
      this.addModifyDialogTitle = "添加学生信息";
    } else {
      this.addModifyDialogTitle = "修改学生信息";
      selection = $("#studentMngTable").bootstrapTable("getSelections", null)[0]; // 修改只能是一条数据，所以直接用第一个
    }
    modal.find(".studentNum").val(selection ? selection["studentNum"] : "");
    modal.find(".phone").val(selection ? selection["phone"] : "");
    modal.find(".name").val(selection ? selection["name"] : "");
    modal.find(".parentPhone").val(selection ? selection["parentPhone"] : "");
    modal.find(".age").val(selection ? selection["age"] : "");
    modal.find(".sex").val(selection ? selection["sex"] : "");
    modal.find(".address").val(selection ? selection["address"] : "");
    modal.find(".address").attr("title", selection ? selection["address": "");
    modal.modal("show");
  }

  private updateToolbarIconsStatus() {
    let selectionsLength = $("#studentMngTable").bootstrapTable("getSelections", null).length;
    this.isModifyBtnDisabled = selectionsLength !== 1;
    this.isDeleteBtnDisabled = selectionsLength === 0;
    if (this.isModifyBtnDisabled) {
      $("#modifyBtn").addClass("disabled");
    } else {
      $("#modifyBtn").removeClass("disabled");
    }
    if (this.isDeleteBtnDisabled) {
      $("#deleteBtn").addClass("disabled");
    } else {
      $("#deleteBtn").removeClass("disabled");
    }
  }

  private removeItems() {
    let table = $("#studentMngTable");
    let selections = table.bootstrapTable("getSelections", null);
    for (let i = 0; i < selections.length; i++) {
      table.bootstrapTable("removeByUniqueId", selections[i].id);
    }
    $("#deleteBtn").addClass("disabled");
  }

  ngOnDestroy() {
    $("#studentMngTable").bootstrapTable('destroy');
  }

}

interface Student {
  id: string;
  studentNum: string;
  name: string;
  sex: string;
  age: number;
  phone: string;
  parentPhone: string;
  address: string;

}