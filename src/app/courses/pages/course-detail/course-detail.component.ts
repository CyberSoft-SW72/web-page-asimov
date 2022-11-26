import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from "@angular/router";
import { CompetencesService } from "../../services/competences.service";
import { CoursesService } from "../../services/courses.service";
import { ItemsService } from "../../services/items.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  isUpdated: boolean = false;
  addEdited: any;
  addItemsForm: FormGroup = this.formBuilder.group({
    title: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
    description: ['', {validators: [Validators.required], updateOn: 'change'}]
  })
  constructor(private coursesService: CoursesService, private itemsService: ItemsService,
              private route: ActivatedRoute, private competencesService: CompetencesService,
              public dialog: MatDialog, private formBuilder: FormBuilder) { }

  get title() { return this.addItemsForm.get('title');}
  get description() {return this.addItemsForm.get('description');}

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

  resetForm() {
    this.addItemsForm.reset({title: '', description: ''});
    this.title?.setErrors(null);
    this.description?.setErrors(null);
  }

  createItems() {
    const add = {
      name: this.addItemsForm.value.title,
      description: this.addItemsForm.value.description,
    }
    let courseId;
    this.route.paramMap.subscribe(params => {
      courseId = params.get('id');
    })
    this.itemsService.create(add, courseId).subscribe( (response) => {
      // console.log('announcement added');
      this.resetForm();
      this.getAllItems();
    })
  }

  deleteItems(id: any) {
    this.itemsService.delete(id).subscribe((response) => {
      // console.log('announcement deleted');
      this.getAllItems();
    })
  }

  getItemsEdited(add: any){
    this.isUpdated = !this.isUpdated;
    this.addEdited = add;
    this.title?.setValue(this.addEdited.title);
    this.description?.setValue(this.addEdited.description)
  }

  cancel() {
    this.isUpdated = !this.isUpdated;
    this.resetForm();
    this.addEdited = {}
  }
  updateItems() {
    const add = {
      name: this.addItemsForm.value.title,
      description: this.addItemsForm.value.description,
    }
    this.itemsService.update(this.addEdited.id, add).subscribe( (response) => {
      console.log('announcement updated');
      this.getAllItems();
      this.cancel()
    })
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
