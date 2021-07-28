import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'sign-in-form',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  signInForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }

  get email() {
    return this.signInForm.get('email')
  }

  get password() {
    return this.signInForm.get('password')
  }

}
