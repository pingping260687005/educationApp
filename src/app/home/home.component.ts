import { Component, OnInit, Injectable } from '@angular/core';
import { NotificationService } from '../notificationService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
    document.addEventListener('show-toast-success', (e: any) => {
      if (e.detail) {
        $('.toast-success').html(e.detail.msg);
      }
      $('.toast-success').addClass('toast-show');
      setTimeout(() => {
        $('.toast-success').removeClass('toast-show');
      }, 3000);
    });
    document.addEventListener('show-toast-error', (e: any) => {
      if (e.detail) {
        $('.toast-error').html(e.detail.msg);
      }
      $('.toast-error').addClass('toast-show');
      setTimeout(() => {
        $('.toast-error').removeClass('toast-show');
      }, 3000);
    });
  }
}
