// lib components & modules
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatFormFieldModule} from '@angular/material/form-field'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {HttpClientModule} from '@angular/common/http'
import {MatCardModule} from '@angular/material/card'
import {MatDividerModule} from '@angular/material/divider'
import {MatIconModule} from '@angular/material/icon'
import {MatSelectModule} from '@angular/material/select'
import {MatDialogModule} from '@angular/material/dialog'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core'
import {ChartsModule} from 'ng2-charts'
import {MatListModule} from '@angular/material/list'
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker'
import {InfiniteScrollModule} from 'ngx-infinite-scroll'
import {StoreModule} from '@ngrx/store'
import {MatMenuModule} from '@angular/material/menu'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {RouterModule} from '@angular/router'
import {CommonModule} from '@angular/common'

// app components & modules
import {CategoryCardModule} from './category-card/category-card.module'
import {AppRoutingModule} from './app-routing.module'
import {NavbarModule} from './navbar/navbar.module'
import {WalletChartModule} from './wallet-chart/wallet-chart.module'
import {AppComponent} from './app.component'
import {CardsContainerComponent} from './cards-container/cards-container.component'
import {AddCategoryFormComponent} from './add-category-form/add-category-form.component'
import {ConfirmPopupComponent} from './confirm-popup/confirm-popup.component'

// app services
import UserService from './services/user.service'
import CurrentUserService from './services/currentUser.service'
import CategoryService from './services/category.service'
import TransactionService from './services/transaction.service'
import AuthService from './services/auth.service'
import ApiConnector from '../api/api.connector'
import CacheService from './services/cache.service'

// store
import CardsContainerStore from './store/cards-store/cards-container.store'
import {cardsContainerReducer} from './store/cards-store/cards-container.reducer'

// app config
import {environment} from '../environments/environment'
import {BASE_SERVER_URL} from './app.config'
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {reducers} from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";
import AuthEffects from "./store/user/auth.effects";
import {authReducer} from "./store/user/user.reducers";


// @ts-ignore
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
    StoreModule.forRoot({cards: cardsContainerReducer, auth: authReducer}),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      name: 'MK App',
      logOnly: environment.production
    }),
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ApiConnector,
    UserService,
    CurrentUserService,
    CategoryService,
    TransactionService,
    AuthService,
    {provide: BASE_SERVER_URL, useValue: environment.serverUrl},
    CardsContainerStore,
    CacheService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
