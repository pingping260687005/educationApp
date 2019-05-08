import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
private appName = '乐尔夫培训系统后台';
private username = '';
private psd = '';
private form;
private loginFormErrMsg = '用户名或密码不正确';
private canLogin = false;

  constructor(private route: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'username': ['', [
      ]],
      'psd': ['',[
      ]],
    });
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

  onSubmit(){
    if(this.username === 'admin' && this.psd === 'admin'){
      this.route.navigate(['/home']);
      sessionStorage.setItem('token', "test")
    }else{
      this.canLogin = true;
      $('#loginErrMsg').addClass('login-error-msg-show');
    }
  }

}
