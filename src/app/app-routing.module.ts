import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./account/sign-in/sign-in.component";
import {SignUpComponent} from "./account/sign-up/sign-up.component";
import {CategoryCardComponent} from "./category-card/category-card.component";
import {CardsContainerComponent} from "./cards-container/cards-container.component";
import {WalletPageComponent} from "./wallet-page/wallet-page.component";
import {AddTransactionFormComponent} from "./add-transaction-form/add-transaction-form.component";
import {Page404Component} from "./page404/page404.component";

const routes: Routes = [
  {path: 'wallet', component: WalletPageComponent},
  {path: 'sign-in', component: SignInComponent, data: {animation: 'isRight'}},
  {path: 'sign-up', component: SignUpComponent, data: {animation: 'isLeft'}},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
