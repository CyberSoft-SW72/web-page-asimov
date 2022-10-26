import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  valueProgress:number = 0;
  dateOut: number = 0;
  announcements: Array<any> = [];
  constructor(private DashboardService: DashboardService) { }

  ngOnInit(): void {
    this.setProgressDate();
    this.getAllAnnouncements();
  }

  setProgressDate() {
    let dateStart = new Date(2022, 3, 16);
    let dateEnd = new Date(2022,11,10);
    let dateNow = new Date();
    let totalDays = dateEnd.getTime() - dateStart.getTime();
    let daysProgress = dateNow.getTime() - dateStart.getTime();
    this.dateOut = (totalDays) - daysProgress;
    this.dateOut = Math.trunc(this.dateOut/(8.64*10000000));
    this.valueProgress = Math.trunc((daysProgress*100)/totalDays);
  }

  getAllAnnouncements() {
    this.DashboardService.getAllAnnouncements()
      .subscribe( (response: any) => {
        this.announcements = response;
        this.announcements.reverse();
      });
  }
}
