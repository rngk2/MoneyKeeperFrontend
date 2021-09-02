import {NgModule} from '@angular/core'
import {CategoryCardComponent} from './category-card.component'
import {MatIconModule} from '@angular/material/icon'
import {MatDividerModule} from '@angular/material/divider'
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import {TransactionsModule} from '../transactions/transactions.module'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {MatInputModule} from "@angular/material/input";

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
    ],
  exports: [
    CategoryCardComponent
  ]
})
export class CategoryCardModule { }
