import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { Router } from "@angular/router";
import { SignInService } from "../../services/sign-in.service";

interface user {
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  hide = true;
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  isTeacher: boolean = false;

  constructor(public builder: FormBuilder, public authService: SignInService, public router: Router) {
  }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('directorId');
  }

  onSubmit() {
    const toSubmit: user = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
      role : this.isTeacher ? 'ROLE_TEACHER' : 'ROLE_STUDENT'
    }
    this.authService.signIn(toSubmit).subscribe((response:any) => {
      // console.log(response)

      if(response){
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('role', response.roles);
        if(localStorage.getItem('role') === 'ROLE_TEACHER'){
          this.authService.getTeacher(localStorage.getItem('userId')).subscribe((response:any) => {
            localStorage.setItem('directorId', response.director_id);
          })
        }
      }
    })

  }

  auth(){
    this.onSubmit();
    this.router.navigate(['/main/dashboard/']);
  }

  cancelSignIn() {
    console.log('Cancelled');
  }

  select($event: MatRadioChange) {
    this.isTeacher = $event.value === 'ROLE_TEACHER';
  }

}
