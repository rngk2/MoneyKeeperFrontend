import {Component, Inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BASE_SERVER_URL} from '../../app.config';
import UserService from '../../services/user.service';
import {CreateUserDto} from '../../../api/api.generated';
import {Subject} from "rxjs";
import {AuthActions} from "../../store/user/user.actions";
import {Store} from "@ngrx/store";


@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnDestroy {

  public signUpForm: FormGroup;

  private readonly subs = new Subject<void>();

  constructor(private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly userService: UserService,
              @Inject(BASE_SERVER_URL) private readonly serverUrl: string,
              private readonly userStore: Store<any>) {
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

  public submit(): void {
    const user: CreateUserDto = {
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      email: this.email?.value,
      password: this.password?.value
    };

    // this.userService.api.usersCreate(user);
    console.log('inSubmit');
    this.userStore.dispatch(AuthActions.SignUp(user));
  }

  public ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
  }
}
