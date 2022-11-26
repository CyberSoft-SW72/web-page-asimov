import { Component, OnInit } from '@angular/core';
import {CoursesService} from "../../services/courses.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Array<any> = [];
  isUpdated: boolean = false;
  addEdited: any;

  addCoursesForm: FormGroup = this.formBuilder.group({
    title: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
    description: ['', {validators: [Validators.required], updateOn: 'change'}]
  })
  private estado: boolean = true;

  constructor(private courseService: CoursesService, private formBuilder: FormBuilder) { }

  get title() { return this.addCoursesForm.get('title');}
  get description() {return this.addCoursesForm.get('description');}
  ngOnInit(): void {
    this.getAllCourse();
  }

  getAllCourses(teacherId: any) {
    this.courseService.getAllByTeacherId(teacherId)
      .subscribe( (response: any) => {
        this.courses = response;
      })
  }
  getAllCourse() {
    this.courseService.getAllCourses()
      .subscribe( (response: any) => {
        this.courses = response;
      })
  }
  resetForm() {
    this.addCoursesForm.reset({title: '', description: ''});
    this.title?.setErrors(null);
    this.description?.setErrors(null);
  }

  createCourse() {
    const add = {
      name: this.addCoursesForm.value.title,
      description: this.addCoursesForm.value.description,
    }

    this.courseService.create(add).subscribe( (response) => {
      // console.log('announcement added');
      this.resetForm();
      this.getAllCourse();
    })
  }

  deleteCourse(id: any) {
    this.courseService.delete(id).subscribe((response) => {
      // console.log('announcement deleted');
      this.getAllCourse();
    })
  }

  getCourseEdited(add: any){
    this.isUpdated = !this.isUpdated;
    this.addEdited = add;
    this.title?.setValue(this.addEdited.name);
    this.description?.setValue(this.addEdited.description)
  }

  cancel() {
    this.isUpdated = !this.isUpdated;
    this.resetForm();
    this.addEdited = {}
  }
  updateCourse() {
    const add = {
      name: this.addCoursesForm.value.title,
      description: this.addCoursesForm.value.description,
    }
    this.courseService.update(this.addEdited.id, add).subscribe( (response) => {
      console.log('announcement updated');
      this.getAllCourse();
      this.cancel()
    })
  }
}
