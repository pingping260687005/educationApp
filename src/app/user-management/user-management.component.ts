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
  ngAfterViewInit(){
    $('#userMngTable').bootstrapTable({
      columns: [{
          field: 'id',
          title: 'Item ID'
      }, {
          field: 'name',
          title: 'Item Name'
      }, {
          field: 'price',
          title: 'Item Price'
      }],
      data: [{
          id: 1,
          name: 'Item 1',
          price: '$1'
      }, {
          id: 2,
          name: 'Item 2',
          price: '$2'
      }]
  });
  }
  ngOnDestroy(){
   // $("#userMngTable").bootstrapTable('destroy');
  }

}
