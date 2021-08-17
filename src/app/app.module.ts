// lib components & modules
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {ChartsModule} from "ng2-charts";
import {MatListModule} from "@angular/material/list";
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from "@angular-material-components/datetime-picker";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

// app components & modules
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {CardsContainerComponent} from './cards-container/cards-container.component';
import {WalletPageComponent} from './wallet-page/wallet-page.component';
import {AddCategoryFormComponent} from './add-category-form/add-category-form.component';
import {Page404Component} from './page404/page404.component';
import {WalletChartComponent} from './wallet-chart/wallet-chart.component';
import {CategoryCardComponent} from './category-card/category-card.component';

// lib services
import HttpService from "./services/http.service";

// app services
import UserService from "./services/user.service";
import {environment} from "../environments/environment";
import {BASE_SERVER_URL} from "./app.config";
import {AccountModule} from "./account/account.module";
import {ConfirmPopupComponent} from './confirm-popup/confirm-popup.component';
import {StoreModule} from "@ngrx/store";
import {cardsContainerReducer} from "./store/cards-store/cards-container.reducer";
import CardsContainerStore from "./store/cards-store/cards-container.store";
import {MatMenuModule} from "@angular/material/menu";
import {TransactionsModule} from "./transactions/transactions.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryCardComponent,
    CardsContainerComponent,
    WalletPageComponent,
    AddCategoryFormComponent,
    Page404Component,
    WalletChartComponent,
    ConfirmPopupComponent
  ],
  imports: [
    // app modules
    AccountModule,
    TransactionsModule,

    // lib modules
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
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
    StoreModule.forRoot({cards: cardsContainerReducer}),
    MatMenuModule
  ],
  providers: [
    HttpService,
    UserService,
    {provide: BASE_SERVER_URL, useValue: environment.serverUrl},
    CardsContainerStore
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
