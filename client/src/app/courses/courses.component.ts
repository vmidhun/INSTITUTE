import { CourseData } from './../../models';
import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from 'angularfire2/firestore'
// import { AngularFirestoreCollection } from 'angularfire2/firestore'
// import { AngularFirestoreDocument } from 'angularfire2/firestore'

//import { CourseData } from '../../models';
// import { Observable } from 'rxjs'

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  allCourses:any[];


  CourseName="";
  CourseDuration="";
  CourseData = {Name:this.CourseName,Duration:this.CourseDuration}
  constructor(private service: CoursesService) { }

  ngOnInit() {
    this.service.getCourses().subscribe(
      response =>{
        this.allCourses = response.json();
        console.log("---------------------- ng onInt")
      },
      error=>{
        if(error.status==404)
          alert("Page not found. Please check URL");
        else{
          alert("An unexpected error has occured");
          console.log(error);
        }
      }
    );
  }

  // coursesCollection: AngularFirestoreCollection<CourseData>;
  // coursesDocument:AngularFirestoreDocument<CourseData>;
  // courses: Observable<CourseData[]>;



  // constructor(public db: AngularFirestore) { 
  //   this.courses = this.db.collection('courses').valueChanges();
  //   this.courses.subscribe(courses=>{console.log(this.courses);})
  //   this.coursesCollection = this.db.collection('courses');   
  // }

  // createNewCourseRecord(){    
  //   const CourseId = this.db.createId()  
  //   this.coursesCollection.doc(CourseId).set({Name:this.CourseName,Duration:this.CourseDuration,Id:CourseId})   
  //   this.ClearFields()
  // }

  // remove(Course:CourseData) {
  //   this.coursesDocument = this.db.doc("courses/"+this.CourseId);
  //   this.coursesDocument.delete();
  // }

  // updateCourseRecord(){
  //   console.log(" - >"+this.CourseName)
  //   var UpdatedCourseData = {Name:this.CourseName,Duration:this.CourseDuration,Id:this.CourseId} 
  //   this.coursesDocument = this.db.doc("courses/"+this.CourseId);   
  //   this.coursesDocument.update(UpdatedCourseData);
  // }

  // PopulateModal(course:CourseData){
  //   console.log(" - >"+course.Name)
  //   this.CourseName = course.Name;
  //   this.CourseDuration = course.Duration;
  //   this.CourseId = course.Id;
  // }

  // ClearFields(){
  //   this.CourseName = "";
  //   this.CourseDuration = "";
  //   this.CourseId = "";
  // }

  
  
}

