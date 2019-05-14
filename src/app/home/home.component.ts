import { Component, OnInit, Injectable } from '@angular/core';
import * as CommonService from '../common-service/commonService';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private notificationService: CommonService.NotificationService, private toastMessageService: CommonService.ToastMessageService) { }

  ngOnInit() {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  }
}
