import { CourseData } from './../../models';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private allCoursesUrl = "http://localhost:5000/api/courses";
  private createCoursesUrl = "http://localhost:5000/api/courses";

  CourseData

  constructor(private myHttp:Http) {}

  getCourses(){
    console.log("getCourses")
    return this.myHttp.get(this.allCoursesUrl);
  }

  createNewCourseRecord(){
    return this.myHttp.post(this.createCoursesUrl,this.CourseData);
  }
}
