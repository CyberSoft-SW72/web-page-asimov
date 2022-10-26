import { Component, OnInit } from '@angular/core';
import { TopTeachersService } from "../../services/top-teachers.service";

@Component({
  selector: 'app-teachers',
  templateUrl: './top-teachers.component.html',
  styleUrls: ['./top-teachers.component.scss']
})
export class TopTeachersComponent implements OnInit {

  teachers: Array<any> = [];
  percent: number = 0;
  top: any;
  constructor(private TeachersService: TopTeachersService) { }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  getAllTeachers() {
    this.TeachersService.getAll().subscribe( (response: any) => {
      response.sort((a:any, b:any) =>  0 - (a.points < b.points ? -1 : 1));
      this.teachers = response;
      this.top = response[0];
      this.percent = this.top.point/2000*100;
      console.log(this.top);
    })
  }
}
