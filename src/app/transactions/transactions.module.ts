import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AboutTransactionComponent } from './about-transaction/about-transaction.component';
import { AddEarningFormComponent } from './add-earning-form/add-earning-form.component';
import { AddTransactionFormComponent } from './add-transaction-form/add-transaction-form.component';
import { AllTransactionsPageComponent } from './all-transactions-page/all-transactions-page.component';
import { CategoryTransactionsComponent } from './category-transactions/category-transactions.component';
import { EarningsPageComponent } from './earnings-page/earnings-page.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';

@NgModule({
  declarations: [
    AboutTransactionComponent,
    AddTransactionFormComponent,
    AddEarningFormComponent,
    AllTransactionsPageComponent,
    EarningsPageComponent,
    TransactionsListComponent,
    CategoryTransactionsComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule,
    MatListModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [
    AboutTransactionComponent,
    AddTransactionFormComponent,
    AddEarningFormComponent,
    EarningsPageComponent,
    TransactionsListComponent,
    AllTransactionsPageComponent
  ]
})
export class TransactionsModule {
}
