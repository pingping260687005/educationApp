import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': window.sessionStorage.getItem('token') })
};
@Injectable({ providedIn: 'root'})
export class StudentService {
  private studentUrl = '/api/students';
  constructor(public http: HttpClient){}

  getAllStudent():Observable<Student[]>{
    return this.http.get<Student[]>(this.studentUrl, httpOptions).pipe(
      tap(_ => this.log(`get all students`)),
      catchError(this.handleError<any>('getAllStudent',[]))
    );
  }

  getStudent(id: number):Observable<Student>{
    return this.http.get<Student>(`${this.studentUrl}/${id}`, httpOptions).pipe(
      tap(_ => this.log(`get student id=${id}`)),
      catchError(this.handleError<Student>('getStudent'))
    );
  }

  addStudent (student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentUrl, student, httpOptions).pipe(
      tap((student: Student) => this.log(`added Student w/ id=${student.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  updateStudent (student: Student): Observable<Student> {
    return this.http.put<Student>(this.studentUrl, student, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${student.id}`)),
      catchError(this.handleError<Student>('updateStudent'))
    );
  }

  deleteStudent(id: number): Observable<any> {
    const url = `${this.studentUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete<any>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted student id=${id}`)),
        catchError(this.handleError<any>('deleteStudent'))
      );
  }

  deleteStudents(ids: number[]): Observable<String> {
    const url = `${this.studentUrl}/deleteStudents`; // DELETE api/heroes/42
    return this.http.post<String>(url, ids, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted students`)),
        catchError(this.handleError<String>('deleteStudents'))
      );
  }

  log(arg0: string) {
    console.log(arg0);
  }
  handleError<T>(operation = 'operation', result?: T) {
    // throw new Error("Method not implemented.");
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
} 