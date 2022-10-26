import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CoursesService } from "../../../courses/services/courses.service";
import { TeachersService } from "../../services/teachers.service";

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {
  teachers:any = []
  teacher:any  = {}
  courses: any = []
  percentProgress: number = 0
  constructor(private teacherService: TeachersService, private route: ActivatedRoute, private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.getTeacherById()
    this.getCoursesByTeacherId()
  }

  getTeacherById() {
    let teacherId;
    this.route.paramMap.subscribe(params => {
      teacherId = params.get('id');
    })
    this.teacherService.getById(teacherId)
      .subscribe( (response: any) => {
        this.teacher = response;
        this.percentProgress = this.teacher.point/2000*100; //->assign value in percent
      })
  }
  getCoursesByTeacherId() {
    let teacherId;
    this.route.paramMap.subscribe(params => {
      teacherId = params.get('id');
    })
    this.teacherService.getCourses(teacherId)
      .subscribe( (response: any) => {
        this.courses = response;
      }
      )
  }
}
