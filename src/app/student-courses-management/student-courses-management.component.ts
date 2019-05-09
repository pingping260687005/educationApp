import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Http } from '@angular/http';
// import 'rxjs/Rx';
import { Observable, from } from 'rxjs/index';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-student-courses-management',
  templateUrl: './student-courses-management.component.html',
  styleUrls: ['./student-courses-management.component.scss']
})
export class StudentCoursesManagementComponentComponent implements OnInit {
  dataSource: Observable<any>;
  private addModifyDialogTitle = '';
  private isModifyBtnDisabled = true;
  private isDeleteBtnDisabled = true;
    // 定义表单
    private modal;
    private form;
    private isAdd = true;
    private formErrors = {
     name: '',
     course: '',
     teacherName: '',
     applyDate: '',
     availableTimes: '',
     score: '',
     feedback: ''
   };

   // 为每一项表单验证添加说明文字
 validationMessage = {
  'name': {
    'required': '请填写姓名'
  },
  'course': {
    'required': '请填写课程'
  },
  'teacherName': {
    'required': '请填写教师'
  },
  'applyDate': {
    'required': '请填写报班日期',
  },
  'availableTimes': {
    'required': '请填写可用次数',
    'pattern': '请填写有效数字'
  },
  'score': {
    'required': '请填写成绩',
    'pattern': '请填写有效分数'
  },
  'feedback': {
    'required': '请填写反馈'
  }
};

  constructor(private http: Http, private formBuilder: FormBuilder) {
      // 用http请求
      this.dataSource = this.http.get('/api/students');
      // .map(res=> res.json());
   }

  ngOnInit() {
    this.buildForm();
     // 真正的发请求取数据
     this.dataSource.subscribe((res) => {
      // get real data
      const students: Student[] = JSON.parse(res['_body']);
      // set data
      // $('#studentCourseMngTable').bootstrapTable('load', students);
    });
    this.modal = $('#addOrModifyModal');
    this.modal.on('hide.bs.modal', () => {
      this.form.reset();
    });
  }
  ngAfterViewInit() {
    $('#studentCourseMngTable').bootstrapTable({
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
        field: 'name',
        title: '姓名',
        sortable: true
      },
      {
        field: 'course',
        title: '课程',
        sortable: true
      },
      {
        field: 'teacherName',
        title: '教师',
        sortable: true
      }, {
        field: 'applyDate',
        title: '报班日期',
        sortable: true
      }, {
        field: 'availableTimes',
        title: '可用次数',
        sortable: true
      }, {
        field: 'score',
        title: '成绩',
        sortable: true
      }, {
        field: 'feedback',
        title: '反馈',
        sortable: true
      }],
      data: this.getStudentList(),
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
      'name': ['', [
        Validators.required
      ]],
      'course': ['', [
        Validators.required
      ]],
      'teacherName': ['', [
        Validators.required
      ]],
      'applyDate': ['', [
        Validators.required,
      ]],
      'availableTimes': ['', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]],
      'score': ['', [
        Validators.required,
        Validators.pattern(/(^\d+$)|(^\d+\.\d{0,}$)/)
      ]],
      'feedback': ['', [
        Validators.required
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
    if (form.invalid) {
      $('#submit-btn').addClass('disabled');
    } else {
      $('#submit-btn').removeClass('disabled');
    }

  }

  private getStudentList(): StudentCourse[] {
    //////// hard code////////////////
    const studentList: StudentCourse[] = [];
    let studentCourse: StudentCourse;
    for (let i = 0; i < 100; i++) {
      studentCourse = {
        id: i.toString(),
        name: '随机 ' + i,
        course: '钢琴',
        teacherName: '马云',
        applyDate: '2018-11-06',
        availableTimes: '3',
        score: '100',
        feedback: '123'
      };
      studentList.push(studentCourse);
    }
    return studentList;
  }

  private showModal(isAdd: boolean) {
    this.isAdd = isAdd;
    const modal = $('#addOrModifyModal');
    if (isAdd) {
      this.addModifyDialogTitle = '添加学生课程';
      $('#submit-btn').addClass('disabled');
    } else {
      this.addModifyDialogTitle = '修改学生课程';
      const {id, name, course, teacherName, applyDate, availableTimes, score, feedback} = $('#studentCourseMngTable').bootstrapTable('getSelections', null)[0];
      this.form.setValue({
        id: id,
        name: name,
        course: course,
        teacherName: teacherName,
        applyDate: applyDate,
        availableTimes: availableTimes,
        score: score,
        feedback: feedback
      }); // 修改只能是一条数据，所以直接用第一个
      $('#submit-btn').removeClass('disabled');
    }

    modal.find('.address').attr('title', this.form.value ? this.form.value['address'] : '');
    modal.modal('show');
  }

  private updateToolbarIconsStatus() {
    const selectionsLength = $('#studentCourseMngTable').bootstrapTable('getSelections', null).length;
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
    const table = $('#studentCourseMngTable');
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
    $('#confirmDeleteDialog').modal('hide');
  }
  ngOnDestroy() {
    $('#studentCourseMngTable').bootstrapTable('destroy');
  }

  onSubmit () {
    const table = $('#studentCourseMngTable');

    if (this.isAdd) {
      $('#studentCourseMngTable').bootstrapTable('insertRow', {index: 0, row: this.form.value} );
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
      $('#studentCourseMngTable').bootstrapTable('updateByUniqueId', {index: this.form.value.id, row: this.form.value} );
      document.dispatchEvent(new CustomEvent('show-toast-success', {
        detail: {
          msg: '修改成功'
        }
      }));
      // this.studentService.updateStudent(this.form.value).subscribe(res => {
      //   if ( res.message === 'succeed') {
      //     const index = $('#studentCourseMngTable .selected').attr('data-index');
      //     $('#studentCourseMngTable').bootstrapTable('updateRow', {index: Number(index), row: res});
      //   } else {
      //     // res.message === 'failed'
      //     // TODO:  error
      //     window.alert('add student failed');
      //   }
      // });
    }
    const modal = $('#addOrModifyModal');
    modal.modal('hide');
  }

  openConfirmDeleteDialog() {
    $('#confirmDeleteDialog').modal('show');
  }

}

interface StudentCourse {
  id: string;
  name: string;
  course: string;
  teacherName: string;
  applyDate: string;
  availableTimes: string;
  score: string;
  feedback: string;
}
