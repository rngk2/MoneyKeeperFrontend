import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllTransactionsPageComponent } from './all-transactions-page/all-transactions-page.component';
import { CategoryTransactionsComponent } from './category-transactions/category-transactions.component';

const routes: Routes = [
  {
    path: '',
    component: AllTransactionsPageComponent,
    children: [
      {
        path: ':categoryName',
        component: CategoryTransactionsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {
}
