import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {RouterModule} from '@angular/router';
import {AccountComponent} from './account.component';
import {NavbarModule} from "../navbar/navbar.module";
import {AccountRoutingModule} from "./account-routing.module";

@NgModule({
  declarations: [
    AccountComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    // app modules
    NavbarModule,
    AccountRoutingModule,

    // lib modules
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ]
})
export class AccountModule { }
