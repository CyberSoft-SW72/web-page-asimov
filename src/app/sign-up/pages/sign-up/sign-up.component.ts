import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { SignUpService } from "../../services/sign-up.service";

interface user {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  password: string;
  phone: string;
  role: string;
  point: number;
  directorId: number | null;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  hide = true;
  registerForm = new FormGroup({
    fName: new FormControl('', [Validators.required]),
    lName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.pattern(/[0-9]*/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
    number: new FormControl('', [Validators.required, Validators.pattern(/[- +()0-9]+/)]),
    directorsControl : new FormControl('',Validators.required)
  });
  isTeacher: boolean = false;
  selectedDirector: number | undefined ;
  directors:Array<any> = [];

  constructor(private signUpService: SignUpService) { }

  ngOnInit(): void {
    this.getAllDirectors()
  }

  showSelect($event: MatRadioChange) {
    this.isTeacher = $event.value === 'ROLE_TEACHER';
    this.getAllDirectors();
  }

  onSubmit() {
    const toSubmit: user = {
      first_name: this.registerForm.value.fName,
      last_name: this.registerForm.value.lName,
      age: this.registerForm.value.age,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phone: this.registerForm.value.number,
      role: this.isTeacher ? 'ROLE_TEACHER' : 'ROLE_DIRECTOR',
      point: 0,
      directorId: this.selectedDirector ? this.selectedDirector : null
    }
    this.signUpService.signUp(toSubmit).subscribe((response:any) => {
      // console.log(response);
    })
    this.refresh();
  }

  refresh(){
    // window.location.reload();
    this.registerForm.reset();
  }
  getAllDirectors() {
    return this.signUpService.getAllDirectors().subscribe((response:any) => {
      this.directors = response;
      this.directors.sort((a, b) => {
        if (a.last_name < b.last_name) {
          return -1;
        }
        if (a.last_name > b.last_name) {
          return 1;
        }
        return 0;
      }
      );
    })
  }
}
