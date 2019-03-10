import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vedio-detail-management',
  templateUrl: './vedio-detail-management.component.html',
  styleUrls: ['./vedio-detail-management.component.css']
})
export class VedioDetailManagementComponentComponent implements OnInit {
private videoList = [];
  constructor() { }

  ngOnInit() {
    // this.initFileUpoad();
    this.getVideoList();
  }

  initFileUpoad() {
    $('#input-b9').fileinput({
      language: 'zh', // 设置语言
      showPreview: true,
      showUpload: false,
      elErrorContainer: '#kartik-file-errors',
      allowedFileExtensions: ['jpg', 'png', 'gif']
      // uploadUrl: '/site/file-upload-single'
  });
  }

  getVideoList() {
    this.videoList = [
      {
        url: '../../assets/勤杂财务表.jpg',
        length: '01:10:30'
      },
      {
        url: '../../assets/学生教师表.jpg',
        length: '00:30:30'
      },
      {
        url: '../../assets/学生表.jpg',
        length: '01:00:30'
      },
      {
        url: '../../assets/学生表.jpg',
        length: '01:00:30'
      },
      {
        url: '../../assets/学生表.jpg',
        length: '01:00:30'
      },
      {
        url: '../../assets/学生表.jpg',
        length: '01:00:30'
      },
      {
        url: '../../assets/学生表.jpg',
        length: '01:00:30'
      },
      {
        url: '../../assets/学生表.jpg',
        length: '01:00:30'
      },
      {
        url: '../../assets/学生表.jpg',
        length: '01:00:30'
      }
    ];
  }
}
