import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
private appName = '乐尔夫培训系统后台';
  constructor() {
    window.addEventListener('resize', (e) => {
      this.resetLoginPanePaddingVertical();
    });

  }

  ngOnInit() {
    this.resetLoginPanePaddingVertical();
  }

  resetLoginPanePaddingVertical () {
    const targetDom = document.getElementsByClassName('login-view')[0];
    (<any>targetDom).style.setProperty('--paddingVertical', (window.document.body.clientHeight - 400) / 2 + 'px');
  }

}
