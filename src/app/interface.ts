interface User {
  id: string;
  username: string;
  password: string;
  authority: string;
}

interface Student {
  id: string;
  studentNum: string;
  name: string;
  sex: string;
  age: number;
  phone: string;
  parentPhone: string;
  address: string;
}

interface Teacher {
  id: string;
  teacherNum: string;
  name: string;
  sex: string;
  age: number;
  phone: string;
  address: string;
  issueDate: string;
  fullTime: boolean;
}
