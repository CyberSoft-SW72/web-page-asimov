import { Component, OnInit } from '@angular/core';
import { CompetencesService } from "../../services/competences.service";

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent implements OnInit {
  competences:Array<any> = [];
  constructor(private competencesService:CompetencesService) {

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
}
