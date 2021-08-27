import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import AuthService from '../../services/auth.service';

@Component({
  selector: 'sign-in-form',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public signInForm: FormGroup;

  constructor(private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly authService: AuthService) {
    this.signInForm = this.fb.group({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  public submit(): void {
    this.authService.logIn({
      email: this.email?.value,
      password: this.password?.value
    }, () => this.router.navigate(['/wallet']));
  }
}
