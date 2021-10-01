import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { NavbarModule } from "../navbar/navbar.module";
import { AccountRoutingModule } from "./account-routing.module";
import { AccountComponent } from './account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

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
export class AccountModule {
}
