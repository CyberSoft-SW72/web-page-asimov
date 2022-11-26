import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from "../../services/announcement.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-announcement-teacher',
  templateUrl: './announcement-teacher.component.html',
  styleUrls: ['./announcement-teacher.component.css']
})
export class AnnouncementTeacherComponent implements OnInit {
  announcement: Array<any> = [];
  isUpdated: boolean = false;
  addEdited: any;

  addAnnouncementForm: FormGroup = this.formBuilder.group({
    title: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
    description: ['', {validators: [Validators.required], updateOn: 'change'}]
  })

  constructor(private announcementTeacherService: AnnouncementService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllAnnouncementsTeacher();
  }
  getAllAnnouncementsTeacher(){
    return this.announcementTeacherService.getAllAnnouncements(localStorage.getItem("directorId")).subscribe((response: any)=>{
      this.announcement = response;
    })
  }
  get title() { return this.addAnnouncementForm.get('title');}
  get description() {return this.addAnnouncementForm.get('description');}

  resetForm() {
    this.addAnnouncementForm.reset({title: '', description: ''});
    this.title?.setErrors(null);
    this.description?.setErrors(null);
  }

  getAllAnnouncements(directorId: any){
    return this.announcementTeacherService.getAllAnnouncements(directorId).subscribe((response: any)=>{
      this.announcement = response;
    })
  }

  createAnnouncement() {
    const add = {
      title: this.addAnnouncementForm.value.title,
      description: this.addAnnouncementForm.value.description,
    }

    this.announcementTeacherService.create(add).subscribe( (response) => {
      // console.log('announcement added');
      this.resetForm();
      this.getAllAnnouncements(localStorage.getItem('userId'));
    })
  }

  deleteAnnouncement(id: any) {
    this.announcementTeacherService.delete(id).subscribe((response) => {
      // console.log('announcement deleted');
      this.getAllAnnouncements(localStorage.getItem('userId'));
    })
  }

  getAnnouncementEdited(add: any){
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
  updateAnnouncement() {
    const add = {
      title: this.addAnnouncementForm.value.title,
      description: this.addAnnouncementForm.value.description,
    }
    this.announcementTeacherService.update(this.addEdited.id, add).subscribe( (response) => {
      console.log('announcement updated');
      this.getAllAnnouncements(localStorage.getItem('userId'));
      this.cancel()
    })
  }
}
