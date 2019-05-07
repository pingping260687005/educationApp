import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Http } from '@angular/http';
// import 'rxjs/Rx';
import { Observable, from } from 'rxjs/index';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss']
})
export class CourseManagementComponentComponent implements OnInit {

  dataSource: Observable<any>;
  private addModifyDialogTitle = '';
  private isModifyBtnDisabled = true;
  private isDeleteBtnDisabled = true;
  private isAdd = true;
  private modal;
  private form;
  private formErrors = {
    courseTeacher: '',
    hours: '',
    cost: '',
    rate: ''
  };

  // 为每一项表单验证添加说明文字
 validationMessage = {
  'courseTeacher': {
    'required': '请填写教师'
  },
  'hours': {
    'required': '请填写学时',
    'pattern': '请填写有效学时',
    'min': '请填写有效学时'
  },
  'cost': {
    'required': '请填写费用',
    'pattern': '请填写有效费用',
    'min': '请填写有效费用'
  },
  'rate': {
    'required': '请填写评论',
  }
};

  constructor(private http: Http,private formBuilder: FormBuilder) {
      // 用http请求
     // this.dataSource = this.http.get('/api/courses');
      // .map(res=> res.json());
   }

  ngOnInit() {
    this.buildForm();
    //  // 真正的发请求取数据
    //  this.dataSource.subscribe((res) => {
    //   // get real data
    //   const courses: Course[] = JSON.parse(res['_body']);
    //   // set data
    //   // $('#courseMngTable').bootstrapTable('load', students);
    // });
    this.modal = $('#addOrModifyModal');
    this.modal.on('hide.bs.modal', () => {
      this.form.reset();
    });
  }
  ngAfterViewInit() {
    $('#courseMngTable').bootstrapTable({
      columns: [{
        checkbox: true,
        visiable: true
      },
      {
        field: 'id',
        title: 'Item ID',
        visible: false,
        sortable: true
      },
       {
        field: 'courseTeacher',
        title: '课程-教师',
        sortable: true
      },
      {
        field: 'hours',
        title: '学时',
        sortable: true
      },
      {
        field: 'cost',
        title: '费用',
        sortable: true
      }, {
        field: 'rate',
        title: '评价',
        sortable: true
      }],
      data: this.getCourseList(),
      search: true,
      pagination: true,
      pageSize: 10,
      idField: 'id',
      uniqueId: 'id',
      smartDisplay: true,
      checkboxHeader: true,
      clickToSelect: true,
      toolbar: '#toolbar',
      onCheck: () => {
        this.updateToolbarIconsStatus();
      },
      onUncheck: () => {
        this.updateToolbarIconsStatus();
      }
    });
    this.updateToolbarIconsStatus();
  }

  private buildForm() {
    // 通过 formBuilder构建表单
    this.form = this.formBuilder.group({ 
      'id': ['', [
      ]],
      'courseTeacher': ['', [
        Validators.required
      ]],
      'hours': ['',[
        Validators.required,
        Validators.pattern(/(^\d+$)|(^\d+\.\d{0,}$)/),
        Validators.min(0)
      ]],
      'cost': ['', [
        Validators.required,
        Validators.pattern(/(^\d+$)|(^\d+\.\d{0,}$)/),
        Validators.min(0)
      ]],
      'rate': ['', [
        Validators.required,
      ]]
    });

    // 每次表单数据发生变化的时候更新错误信息
    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));

    // 初始化错误信息
    this.onValueChanged();
  }

   // 每次数据发生改变时触发此方法
   onValueChanged(data?: any) {
    // 如果表单不存在则返回
    if (!this.form) { return; }
    // 获取当前的表单
    const form = this.form;

    // 遍历错误消息对象
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // 清空当前的错误消息
      this.formErrors[field] = '';
      // 获取当前表单的控件
      const control = form.get(field);

      // 当前表单存在此空间控件 && 此控件没有被修改 && 此控件验证不通过
      if (control && control.dirty && !control.valid) {
        // 获取验证不通过的控件名，为了获取更详细的不通过信息
        const messages = this.validationMessage[field];
        // 遍历当前控件的错误对象，获取到验证不通过的属性
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          // 把所有验证不通过项的说明文字拼接成错误消息
          this.formErrors[field] = messages[key];
        }
      }
    }
    if(form.invalid){
      $('#submit-btn').addClass('disabled');
    }else{
      $('#submit-btn').removeClass('disabled');
    }
  
  }

  private getCourseList(): Course[] {
    //////// hard code////////////////
    const courseList: Course[] = [];
    let course: Course;
    for (let i = 0; i < 100; i++) {
      course = {
        id: i.toString(),
        courseTeacher: '钢琴-马云' + i,
        hours: 50,
        cost: 1500,
        rate: '5星'
      };
      courseList.push(course);
    }
    return courseList;
  }

  private showModal(isAdd: boolean) {
    this.isAdd = isAdd;
    const modal = $('#addOrModifyModal');
    if (isAdd) {
      this.addModifyDialogTitle = '添加课程';
      $('#submit-btn').addClass('disabled');
    } else {
      this.addModifyDialogTitle = '修改课程';
      let {id,courseTeacher,hours,cost,rate} = $('#courseMngTable').bootstrapTable('getSelections', null)[0];
      this.form.setValue({
        id: id,
        courseTeacher: courseTeacher,
        hours: hours,
        cost: cost,
        rate: rate
      }); // 修改只能是一条数据，所以直接用第一个
      $('#submit-btn').removeClass('disabled');

    }
    modal.modal('show');
  }

  private updateToolbarIconsStatus() {
    const selectionsLength = $('#courseMngTable').bootstrapTable('getSelections', null).length;
    this.isModifyBtnDisabled = selectionsLength !== 1;
    this.isDeleteBtnDisabled = selectionsLength === 0;
    if (this.isModifyBtnDisabled) {
      $('#modifyBtn').addClass('disabled');
    } else {
      $('#modifyBtn').removeClass('disabled');
    }
    if (this.isDeleteBtnDisabled) {
      $('#deleteBtn').addClass('disabled');
    } else {
      $('#deleteBtn').removeClass('disabled');
    }
  }

  private removeItems() {
    const table = $('#courseMngTable');
    const selections = table.bootstrapTable('getSelections', null);
    for (let i = 0; i < selections.length; i++) {
      table.bootstrapTable('removeByUniqueId', selections[i].id);
    }
    $('#deleteBtn').addClass('disabled');
    document.dispatchEvent(new CustomEvent('show-toast-success', {
      detail: {
        msg: '删除成功'
      }
    }));
    $("#confirmDeleteDialog").modal("hide");
  }

  onSubmit () {
    if (this.isAdd) {
      this.form.value.id = Math.random() + '';
      $('#courseMngTable').bootstrapTable('insertRow',{index:0,row:this.form.value} );
      document.dispatchEvent(new CustomEvent('show-toast-success', {
        detail: {
          msg: '添加成功'
        }
      }));
      // add
      // this.studentService.addStudent(this.form.value).subscribe(res => {
      //   if ( res.message === 'succeed') {

      //     // append is append to the bottom, prepend is appending to the top.
      //     table.bootstrapTable('append', {index: 1, row: res});
      //   } else {
      //     // res.message === 'failed'
      //     // TODO:  error
      //     window.alert('add student failed');
      //   }
      // });
    } else {
      // edit
      $('#courseMngTable').bootstrapTable('updateByUniqueId',{id:this.form.value.id,row:this.form.value} );
      // this.studentService.updateStudent(this.form.value).subscribe(res => {
      //   if ( res.message === 'succeed') {
      //     const index = $('#studentMngTable .selected').attr('data-index');
      //     $('#studentMngTable').bootstrapTable('updateRow', {index: Number(index), row: res});
      //   } else {
      //     // res.message === 'failed'
      //     // TODO:  error
      //     window.alert('add student failed');
      //   }
      // });
      document.dispatchEvent(new CustomEvent('show-toast-success', {
        detail: {
          msg: '修改成功'
        }
      }));
    }
    const modal = $('#addOrModifyModal');
    modal.modal('hide');
  }

  ngOnDestroy() {
    $('#courseMngTable').bootstrapTable('destroy');
  }

  openConfirmDeleteDialog(){
    $("#confirmDeleteDialog").modal("show");
  }
}


interface Course {
  id: string;
  courseTeacher: string;
  hours: number;
  cost: number;
  rate: string;
}
