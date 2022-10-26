import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isTeacher: boolean = localStorage.getItem("role") === 'ROLE_TEACHER' ? true : false;

  constructor() { }

  ngOnInit(): void {
    console.log("")
  }

}
