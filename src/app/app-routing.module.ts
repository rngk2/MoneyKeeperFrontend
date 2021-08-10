import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./account/sign-in/sign-in.component";
import {SignUpComponent} from "./account/sign-up/sign-up.component";
import {WalletPageComponent} from "./wallet-page/wallet-page.component";
import {Page404Component} from "./page404/page404.component";
import {CanActivateUserRoutes, Permissions} from "./guards";
import {AllTransactionsPageComponent} from "./all-transactions-page/all-transactions-page.component";

const routes: Routes = [
  {path: 'wallet', component: WalletPageComponent, canActivate: [CanActivateUserRoutes]},
  {path: 'sign-in', component: SignInComponent, data: {animation: 'isRight'}},
  {path: 'sign-up', component: SignUpComponent, data: {animation: 'isLeft'}},
  {path: 'transactions', component: AllTransactionsPageComponent},
  {path: 'sign-out', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateUserRoutes, Permissions]
})
export class AppRoutingModule { }
