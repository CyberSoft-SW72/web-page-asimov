import { Component, OnInit } from '@angular/core';
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  isTeacher: boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getById();
    this.isTeacher = localStorage.getItem("role") === 'ROLE_TEACHER' ? true : false;
  }

  getById() {
    this.profileService.getUser()
      .subscribe( (response:any) => {
        console.log(response);
        this.user = response;
      })
  }
}
