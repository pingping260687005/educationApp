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
        ////////hard code////////////////
        let userList: User[] = [];
        let user1: User = {
            id: "1",
            username: "admin",
            password: "",
            authority: "read-write"
        };
        let user2: User = {
            id: "2",
            username: "root",
            password: "",
            authority: "read-write" 
        };
        userList.push(user1);
        userList.push(user2);
        return userList;
    }

    ngOnDestroy() {
        $("#userMngTable").bootstrapTable('destroy');
    }

}

interface User{
    id: string;
    username: string;
    password: string;
    authority: string; 
}
