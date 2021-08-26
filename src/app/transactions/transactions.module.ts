import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutTransactionComponent} from './about-transaction/about-transaction.component';
import {AddEarningFormComponent} from './add-earning-form/add-earning-form.component';
import {AllTransactionsPageComponent} from './all-transactions-page/all-transactions-page.component';
import {EarningsPageComponent} from './earnings-page/earnings-page.component';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {AddTransactionFormComponent} from './add-transaction-form/add-transaction-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AboutTransactionComponent,
    AddTransactionFormComponent,
    AddEarningFormComponent,
    AllTransactionsPageComponent,
    EarningsPageComponent,
    TransactionsListComponent
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
    MatIconModule
  ],
  exports: [
    AboutTransactionComponent,
    AddTransactionFormComponent,
    AddEarningFormComponent,
    AllTransactionsPageComponent,
    EarningsPageComponent,
    TransactionsListComponent
  ]
})
export class TransactionsModule { }
