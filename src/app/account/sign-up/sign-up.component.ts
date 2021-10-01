import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiContractCreateUser } from '../../../api/api.generated';
import UserStore from "../../store/user/user.store";

@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {

  public readonly signUpForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userStore: UserStore
  ) {
    this.signUpForm = this.fb.group({
      firstName: new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,16}$/)
      ])
    });
  }

  public get firstName() {
    return this.signUpForm.get('firstName');
  }

  public get lastName() {
    return this.signUpForm.get('lastName');
  }

  public get email() {
    return this.signUpForm.get('email');
  }

  public get password() {
    return this.signUpForm.get('password');
  }

  public signUp(): void {
    const user: ApiContractCreateUser = {
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      email: this.email?.value,
      password: this.password?.value
    };

    this.userStore.signUp(user);
  }
}
