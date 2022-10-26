import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from "@angular/router";
import { CompetencesService } from "../../services/competences.service";
import { CoursesService } from "../../services/courses.service";
import { ItemsService } from "../../services/items.service";

export interface ItemData {
  id: number;
  name: string;
  description: string;
  status: boolean;
  idCourse: number;
}

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit, AfterViewInit {

  courses: Array<any> = [];
  items: Array<any> = [];
  competences: Array<any> = [];
  course: any = {};
  percent: number = 0.0;

  constructor(private coursesService: CoursesService, private itemsService: ItemsService,
              private route: ActivatedRoute, private competencesService: CompetencesService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCompetences();
    this.getAllItems();
  }

  ngAfterViewInit() {
    this.getCourseById();
  }

  getAllItems() {
    let courseIde;
    this.route.paramMap.subscribe(params => {
      courseIde = params.get('id');
    })
    this.itemsService.getAllByCourseId(courseIde)
      .subscribe( (response: any) => {
        this.items = response;
      })
  }

  getAllCompetences() {
    let courseId;
    this.route.paramMap.subscribe(params => {
      courseId = params.get('id');
    })
    this.competencesService.getAllByCourseId(courseId)
      .subscribe( (response: any) => {
        this.competences = response;
      })
  }

  getCourseById() {
    let courseId;
    this.route.paramMap.subscribe(params => {
      courseId = params.get('id');
    })
    this.coursesService.getById(courseId)
      .subscribe( (response: any) => {
        this.course = response;
      })
  }

  updatePercent() {
    let lenght = this.items.length;
    this.percent += (100 / lenght);
    this.percent = Math.round(this.percent * 100) / 100;
  }

  openDialog(item: any) {
    const dialogRef = this.dialog.open(DialogCourse, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if (result) {
        this.updatePercent();
      }
    });
  }
}

@Component({
  selector: 'dialog-course',
  templateUrl: 'dialog-course.html',
  //template: 'passed in {{data.name}}'
})
export class DialogCourse {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ItemData, private _sanitizer: DomSanitizer,
  public dialogRef: MatDialogRef<DialogCourse>) {}
  onComplete(): void{
    this.dialogRef.close();
  }

  getVideoIframe(url: any) {
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl(video);
  }
}
