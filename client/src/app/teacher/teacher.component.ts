import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { TeacherData } from '../../models';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

    teachersCollection: AngularFirestoreCollection<TeacherData>;    
    teacherDocument:AngularFirestoreDocument<TeacherData>;
    teachers: Observable<TeacherData[]>;

    teacherId = ""; 
    teacherName = "";
    teacherMobile = "";
    teacherEmail = "";
    teacherDesignation = "";
   
  constructor(public db:AngularFirestore){
    this.teachers = this.db.collection('teachers').valueChanges();
    this.teachers.subscribe(teachers=>{console.log(this.teachers);})
    this.teachersCollection = this.db.collection('teachers');     
  }; 
  
  createNewTeacherRecord(){    
    const teacherId = this.db.createId()  
    this.teachersCollection.doc(teacherId).set({Name:this.teacherName, Mobile:this.teacherMobile, Email:this.teacherEmail, Designation:this.teacherDesignation, Id:teacherId})   
    this.ClearFields();
  }
 
  remove(teacher: any) {
    this.teacherDocument = this.db.doc(`teachers/${teacher.Id}`);
    this.teacherDocument.delete();
  }

  updateTeacherRecord(teacher:TeacherData){
    var UpdatedTeacherData = {Name:this.teacherName, Mobile:this.teacherMobile, Email:this.teacherEmail, Designation:this.teacherDesignation, Id:this.teacherId} 
    this.teacherDocument = this.db.doc("teachers/"+this.teacherId);   
    this.teacherDocument.update(UpdatedTeacherData);
  }

  PopulateModal(teacher:TeacherData){
    this.teacherName = teacher.Name;
    this.teacherMobile = teacher.Mobile;
    this.teacherEmail = teacher.Email;
    this.teacherDesignation = teacher.Designation;
    this.teacherId = teacher.Id;
   }

  ClearFields(){
    this.teacherName = "";
    this.teacherMobile = "";
    this.teacherEmail = "";
    this.teacherDesignation = "";
    this.teacherId = "";
  }

  ngOnInit() {
  }
}
