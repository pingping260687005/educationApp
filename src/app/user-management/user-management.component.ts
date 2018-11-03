import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    $('#userMngTable').bootstrapTable({
        columns: [{
            // unshown
            field: 'id',
            title: 'Item ID',
            visible: false
        }, {
            field: 'username',
            title: '用户名'
        }, {
            // unshown
            field: 'password',
            title: '密码',
            visible: false
        }, {
            field: 'authority',
            title: '权限'
        }],
        data: this.getUserList()
    });
}
  private getUserList(): User[] {
    //////// hard code////////////////
    const userList: User[] = [];
    const user1: User = {
        id: '1',
        username: 'admin',
        password: '',
        authority: 'read-write'
    };
    const user2: User = {
        id: '2',
        username: 'root',
        password: '',
        authority: 'read-write'
    };
    userList.push(user1);
    userList.push(user2);
    return userList;
}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy () {
    $('#userMngTable').bootstrapTable('destroy');
  }

}

interface User {
    id: string;
    username: string;
    password: string;
    authority: string;
}
