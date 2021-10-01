import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from '@angular/router';

import { TransactionsModule } from '../transactions/transactions.module';
import { CategoryCardComponent } from './category-card.component';

@NgModule({
  declarations: [
    CategoryCardComponent
  ],
  imports: [
    TransactionsModule,

    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [
    CategoryCardComponent
  ]
})
export class CategoryCardModule {
}
