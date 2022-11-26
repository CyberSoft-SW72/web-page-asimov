import { Component, OnInit } from '@angular/core';
import { CompetencesService } from "../../services/competences.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogCompetencesComponent} from "../dialog-competences/dialog-competences.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent implements OnInit {
  competences:Array<any> = [];
  isUpdated: boolean = false;
  addEdited: any;
  addCompetencesForm: FormGroup = this.formBuilder.group({
    title: ['', {validators: [Validators.required, Validators.maxLength(60)], updateOn: 'change'}],
    description: ['', {validators: [Validators.required], updateOn: 'change'}]
  })

  constructor(private competencesService:CompetencesService, public dialog: MatDialog, private formBuilder: FormBuilder) {



  }
  get title() { return this.addCompetencesForm.get('title');}
  get description() {return this.addCompetencesForm.get('description');}
  openDialog() {
    this.dialog.open(DialogCompetencesComponent);
  }
  ngOnInit(): void {
    this.getAllCompetences()
  }
  getAllCompetences() {
    return this.competencesService.getAllCompetences().subscribe((response: any)=>{
      console.log(response);
      this.competences = response;
    })
  }
  resetForm() {
    this.addCompetencesForm.reset({title: '', description: ''});
    this.title?.setErrors(null);
    this.description?.setErrors(null);
  }

  createCompetences() {
    const add = {
      title: this.addCompetencesForm.value.title,
      description: this.addCompetencesForm.value.description,
    }

    this.competencesService.create(add).subscribe( (response) => {
      // console.log('announcement added');
      this.resetForm();
      this.getAllCompetences();
    })
  }

  deleteCompetences(id: any) {
    this.competencesService.delete(id).subscribe((response) => {
      // console.log('announcement deleted');
      this.getAllCompetences();
    })
  }

  getCompetenceEdited(add: any){
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
  updateCompetence() {
    const add = {
      title: this.addCompetencesForm.value.title,
      description: this.addCompetencesForm.value.description,
    }
    this.competencesService.update(this.addEdited.id, add).subscribe( (response) => {
      console.log('announcement updated');
      this.getAllCompetences();
      this.cancel()
    })
  }
}
