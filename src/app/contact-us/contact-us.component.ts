import { Component, OnInit } from '@angular/core';
declare var  AMap: any;    // 一定要声明AMap，要不然报错找不到AMap

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const map = new AMap.Map('container', {
      zoom: 11, // 级别
      center: [116.397428, 39.90923], // 中心点坐标
      viewMode: '3D'// 使用3D视图
  });
  }

}
