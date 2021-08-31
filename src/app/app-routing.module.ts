import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CanActivateUserRoutes, Permissions} from './guards'

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'profile',
    canActivate: [CanActivateUserRoutes],
    loadChildren: () => import('./profile-page/profile-page.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'wallet',
    canActivate: [CanActivateUserRoutes],
    loadChildren: () => import('./wallet-page/wallet-page.module').then(m => m.WalletPageModule)
  },
  {
    path: 'transactions',
    canActivate: [CanActivateUserRoutes],
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule)
  },
  {
    path: 'sign-in',
    redirectTo: '/account/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    redirectTo: '/account/sign-up',
    pathMatch: 'full'
  },
  {
    path: 'sign-out',
    redirectTo: '/account/sign-in',
    pathMatch: 'full'},
  {
    path: '**',
    loadChildren: () => import('./page404/page404.module').then(m => m.Page404Module)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanActivateUserRoutes,
    Permissions
  ]
})
export class AppRoutingModule { }
