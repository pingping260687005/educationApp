import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public sideBarList = [];
  private isCollapsed = false;
  constructor() {
  }

  ngOnInit() {
    this.sideBarList = [{
      routerLink: '/home/user',
      linkName: '用户管理',
      iconClass: 'sidebarIcon fas fa-users',
      id: 'user'
    }, {
      routerLink: '/home/student',
      linkName: '学生管理',
      iconClass: 'sidebarIcon fas fa-user-graduate',
      id: 'student',
      subMenu: [
        {
          routerLink: '/home/student',
          linkName: '学生信息',
          iconClass: 'sidebarIcon fas fa-graduation-cap',
          id: 'student'
        },
        {
          routerLink: '/home/vedioDetail',
          linkName: '视频详情',
          iconClass: 'sidebarIcon fas fa-tv',
          id: 'vedioDetail'
        },
        {
          routerLink: '/home/studentCourses',
          linkName: '学生课程',
          iconClass: 'sidebarIcon fas fa-clipboard-list',
          id: 'studentCourses'
        }
      ]
    },
    {
      routerLink: '/home/teacher',
      linkName: '教师管理',
      iconClass: 'sidebarIcon fas fa-chalkboard-teacher',
      id: 'teacher'
    },
    {
      routerLink: '/home/course',
      linkName: '课程管理',
      iconClass: 'sidebarIcon fas fa-newspaper',
      id: 'course'
    },
    {
      routerLink: '/home/finance',
      linkName: '财务管理',
      iconClass: 'sidebarIcon fas fa-wallet',
      id: 'finance',
      subMenu: [
        {
          routerLink: '/home/teacherFinance',
          linkName: '教师财务',
          iconClass: 'sidebarIcon fas fa-user-secret',
          id: 'finance'
        },
        {
          routerLink: '/home/studentFinance',
          linkName: '学生财务',
          iconClass: 'sidebarIcon fas fa-user-edit',
          id: 'finance'
        },
        {
          routerLink: '/home/otherFinance',
          linkName: '其他费用',
          iconClass: 'sidebarIcon fas fa-money-check-alt',
          id: 'finance'
        }
      ]
    },
  {
    routerLink: '/home/contactUs',
    linkName: '联系我们',
    iconClass: 'sidebarIcon fas fa-chalkboard-teacher',
    id: 'contactUs'
  }];
  }

  toggleSidebarBtnClick() {
    $('#toggleSidebarIcon').toggleClass('fa-rotate-180');
    $('#sidebar').toggleClass('active');
  }
}
