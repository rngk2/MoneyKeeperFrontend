// lib components & modules
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import ApiConnector from '../api/api.connector';

// app config
import { environment } from '../environments/environment';
import { AddCategoryFormComponent } from './add-category-form/add-category-form.component';

// app components & modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BASE_SERVER_URL } from './app.config';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { CategoryCardModule } from './category-card/category-card.module';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { NavbarModule } from './navbar/navbar.module';
import AuthService from './services/auth.service';
import CategoryService from './services/category.service';
import TransactionService from './services/transaction.service';

// app services
import UserService from './services/user.service';
import { appReducers } from "./store/app.reducers";

// store
import CategoriesStore from "./store/categories/categories.store";
import { CategoryEffects } from "./store/categories/category.effects";
import { ChartEffects } from "./store/chart/chart.effects";
import ChartStore from "./store/chart/chart.store";
import { appMetaReducers } from "./store/meta/meta";
import { HydrationEffects } from "./store/meta/rehydration/hydration.effects";
import { TransactionsEffects } from "./store/transactions/transactions.effects";
import TransactionsStore from "./store/transactions/transactions.store";
import { AuthEffects } from "./store/user/auth.effects";
import UserStore from "./store/user/user.store";
import { WalletChartModule } from './wallet-chart/wallet-chart.module';

@NgModule({
  declarations: [
    AppComponent,
    CardsContainerComponent,
    AddCategoryFormComponent,
    ConfirmPopupComponent
  ],
  imports: [
    // app modules
    AppRoutingModule,
    NavbarModule,
    WalletChartModule,
    CategoryCardModule,

    // lib modules
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChartsModule,
    MatListModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    InfiniteScrollModule,
    StoreModule.forRoot(appReducers, { metaReducers: appMetaReducers }),
    EffectsModule.forRoot([
      AuthEffects,
      HydrationEffects,
      TransactionsEffects,
      CategoryEffects,
      ChartEffects
    ]),
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ApiConnector,
    UserService,
    CategoryService,
    TransactionService,
    AuthService,
    { provide: BASE_SERVER_URL, useValue: environment.serverUrl },
    UserStore,
    TransactionsStore,
    CategoriesStore,
    ChartStore
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
