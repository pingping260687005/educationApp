import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent implements OnInit {
  public teacher: ITeacherInfo;
  constructor() { }

  ngOnInit() {
    this.teacher = {
      teacherNum: { title: '工号', value: '123456' },
      name: { title: '姓名', value: '123456' },
      sex: { title: '性别', value: '男' },
      age: { title: '年龄', value: '50' },
      phone: { title: '手机', value: '13992288771' },
      address: { title: '地址', value: '丹阳市黄金路25弄16号201室' },
      issueDate: { title: '入职日期', value: '2018-4-4' },
      fullTime: { title: '兼职/全职', value: '全职' },
      course: { title: '课程', value: '钢琴' }
    };
  }
}



interface ITeacherInfo {
  id?: IKeyValue;
  teacherNum: IKeyValue;
  name: IKeyValue;
  sex: IKeyValue;
  age: IKeyValue;
  phone: IKeyValue;
  address: IKeyValue;
  issueDate: IKeyValue;
  fullTime: IKeyValue;
  course: IKeyValue;
}

interface IKeyValue {
  title: string;
  value: string;
}
