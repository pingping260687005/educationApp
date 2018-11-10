import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vedio-detail-management',
  templateUrl: './vedio-detail-management.component.html',
  styleUrls: ['./vedio-detail-management.component.css']
})
export class VedioDetailManagementComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#input-b9').fileinput({
      language: 'zh', // 设置语言
      showPreview: true,
      showUpload: false,
      elErrorContainer: '#kartik-file-errors',
      allowedFileExtensions: ['jpg', 'png', 'gif']
      // uploadUrl: '/site/file-upload-single'
  });
  }

}
