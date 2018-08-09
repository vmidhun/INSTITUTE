import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { StudentData } from '../../models';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})


export class StudentComponent implements OnInit {

  StudentsCollection:AngularFirestoreCollection<StudentData>
  StudentsDocument:AngularFirestoreDocument<StudentData>
  Students: Observable<StudentData[]>
  
  constructor(public db:AngularFirestore){
    this.Students = this.db.collection('students').valueChanges();
    this.Students.subscribe(students=>{console.log(this.Students);})
    this.StudentsCollection = this.db.collection('students');
  };
 
  StudentId = ""; 
  StudentName = "";
  StudentMobile = "";
  StudentEmail = "";
  StudentCourse = "";

  createNewStudentRecord(){    
    const StudentId = this.db.createId()  
    this.StudentsCollection.doc(StudentId).set({Name:this.StudentName,Mobile:this.StudentMobile,Email:this.StudentEmail,Course:this.StudentCourse,Id:StudentId})   
    this.ClearFields()
  }

  remove(student:StudentData) {
    this.StudentsDocument = this.db.doc(`students/${student.Id}`);
    this.StudentsDocument.delete();
  }

  updateStudentRecord(student:StudentData){
    var UpdatedStudentData = {Name:this.StudentName, Mobile:this.StudentMobile, Email:this.StudentEmail, Course:this.StudentCourse, Id:this.StudentId} 
    this.StudentsDocument = this.db.doc("students/"+this.StudentId);   
    this.StudentsDocument.update(UpdatedStudentData);
  }

  PopulateModal(student:StudentData){
    this.StudentName = student.Name;
    this.StudentMobile = student.Mobile;
    this.StudentEmail = student.Email;
    this.StudentCourse = student.Course;
    this.StudentId = student.Id;
  }


  ClearFields(){
    this.StudentName = "";
    this.StudentMobile = "";
    this.StudentEmail = "";
    this.StudentCourse = "";
    this.StudentId = "";
  }

  ngOnInit() {
  }

}
