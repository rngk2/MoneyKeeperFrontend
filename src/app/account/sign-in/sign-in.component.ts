import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import UserStore from "../../store/user/user.store";

@Component({
  selector: 'sign-in-form',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {

  public readonly signInForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userStore: UserStore
  ) {
    this.signInForm = this.fb.group({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  public get email() {
    return this.signInForm.get('email');
  }

  public get password() {
    return this.signInForm.get('password');
  }

  public submit(): void {
    this.userStore.logIn({
      email: this.email?.value,
      password: this.password?.value
    });
  }
}
