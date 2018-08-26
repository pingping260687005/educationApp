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
      data: this.getStudentList()
    });



  }

  private getStudentList(): Student[] {
    ////////hard code////////////////
    let studentList: Student[] = [];
    let student1: Student = {
      id: "1",
      studentNum: "00011",
      name: "李红",
      sex: "女",
      age: 10,
      phone: '13992288771',
      parentPhone: '13992288771',
      address: '丹阳市黄金路25弄16号201室'
    };
    let student2: Student = {
      id: "2",
      studentNum: "00012",
      name: "王刚",
      sex: "男",
      age: 9,
      phone: '13992288771',
      parentPhone: '13992288771',
      address: '丹阳市黄金路25弄16号201室'
    };
    studentList.push(student1);
    studentList.push(student2);
    return studentList;
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