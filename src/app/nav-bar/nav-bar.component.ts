import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public sideBarList = [];
  private isCollapsed = false;
  constructor() {
  }

  ngOnInit() {
    this.sideBarList = [{
      routerLink: "/user",
      linkName: "用户管理",
      iconClass: "sidebarIcon fas fa-users",
      id: "user"
    }, {
      routerLink: "/student",
      linkName: "学生管理",
      iconClass: "sidebarIcon fas fa-user-graduate",
      id: "student",
      subMenu: [
        {
          routerLink: "/student",
          linkName: "学生信息",
          iconClass: "sidebarIcon fas fa-graduation-cap",
          id: "student"
        },
        {
          routerLink: "/vedioDetail",
          linkName: "视频详情",
          iconClass: "sidebarIcon fas fa-tv",
          id: "vedioDetail"
        },
        {
          routerLink: "/studentCourses",
          linkName: "学生课程",
          iconClass: "sidebarIcon fas fa-clipboard-list",
          id: "studentCourses"
        }
      ]
    },
    {
      routerLink: "/teacher",
      linkName: "教师管理",
      iconClass: "sidebarIcon fas fa-chalkboard-teacher",
      id: "teacher"
    },
    {
      routerLink: "/course",
      linkName: "课程管理",
      iconClass: "sidebarIcon fas fa-newspaper",
      id: "course"
    },
    {
      routerLink: "/finance",
      linkName: "财务管理",
      iconClass: "sidebarIcon fas fa-wallet",
      id: "finance",
      subMenu: [
        {
          routerLink: "/finance",
          linkName: "教师财务",
          iconClass: "sidebarIcon fas fa-user-secret",
          id: "finance"
        },
        {
          routerLink: "/finance",
          linkName: "学生财务",
          iconClass: "sidebarIcon fas fa-user-edit",
          id: "finance"
        },
        {
          routerLink: "/finance",
          linkName: "其他费用",
          iconClass: "sidebarIcon fas fa-money-check-alt",
          id: "finance"
        }
      ]
    }];
  }

  toggleSidebarBtnClick() {
    $("#toggleSidebarIcon").toggleClass("fa-rotate-180");
    $('#sidebar').toggleClass('active');
  }
}
