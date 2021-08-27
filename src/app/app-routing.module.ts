import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WalletPageComponent} from './wallet-page/wallet-page.component';
import {CanActivateUserRoutes, Permissions} from './guards';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile-page/profile-page.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'wallet',
    component: WalletPageComponent,
    canActivate: [CanActivateUserRoutes]
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
