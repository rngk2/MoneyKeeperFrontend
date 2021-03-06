import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsContainerComponent } from '../cards-container/cards-container.component';
import { AllTransactionsPageComponent } from '../transactions/all-transactions-page/all-transactions-page.component';
import { CategoryTransactionsComponent } from '../transactions/category-transactions/category-transactions.component';
import { EarningsPageComponent } from '../transactions/earnings-page/earnings-page.component';
import { WalletPageComponent } from './wallet-page.component';

const routes: Routes = [
  {
    path: '',
    component: WalletPageComponent,
    children: [
      {
        path: 'categories',
        component: CardsContainerComponent
      },
      {
        path: 'transactions/earnings',
        component: EarningsPageComponent
      },
      {
        path: 'transactions',
        component: AllTransactionsPageComponent
      },
      {
        path: 'transactions/:categoryName',
        component: CategoryTransactionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletPageRoutingModule {
}

