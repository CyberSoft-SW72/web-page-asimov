import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from "../../services/announcement.service";

@Component({
  selector: 'app-announcement-teacher',
  templateUrl: './announcement-teacher.component.html',
  styleUrls: ['./announcement-teacher.component.css']
})
export class AnnouncementTeacherComponent implements OnInit {
  announcement: Array<any> = [];

  constructor(private announcementTeacherService: AnnouncementService) { }

  ngOnInit(): void {
    this.getAllAnnouncementsTeacher();
  }
  getAllAnnouncementsTeacher(){
    return this.announcementTeacherService.getAllAnnouncements(localStorage.getItem("directorId")).subscribe((response: any)=>{
      this.announcement = response;
    })
  }

}
