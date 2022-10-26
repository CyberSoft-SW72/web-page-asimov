import { Component, OnInit } from '@angular/core';
import { TeachersService } from "../../services/teachers.service";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teachers: Array<any> = [];

  constructor(private TeachersService: TeachersService) { }

  ngOnInit(): void {
    this.getAllTeachers(localStorage.getItem("userId"));
  }

  getAllTeachers(directorId: any) {
    this.TeachersService.getAll(directorId)
      .subscribe( (response: any) => {
        this.teachers = response;
      })
  }
}
