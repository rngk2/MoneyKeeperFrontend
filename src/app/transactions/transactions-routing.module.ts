import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'
import {CategoryTransactionsComponent} from './category-transactions/category-transactions.component'
import {AllTransactionsPageComponent} from './all-transactions-page/all-transactions-page.component'

const routes: Routes = [
  {
    path: '',
    component: AllTransactionsPageComponent,
    children: [
      {
        path: ':cname',
        component: CategoryTransactionsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
