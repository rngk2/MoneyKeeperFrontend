import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import UserService from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'sign-in-form',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public signInForm: FormGroup

  constructor(private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly userService: UserService)
  {
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

  public submit(): void {
    this.userService.logIn({
      email: this.email?.value,
      password: this.password?.value
    }).subscribe(() => this.router.navigate(["/wallet"]))
  }

}
