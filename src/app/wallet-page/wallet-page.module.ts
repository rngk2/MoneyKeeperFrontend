import {NgModule} from '@angular/core'
import {WalletPageComponent} from './wallet-page.component'
import {RouterModule} from '@angular/router'
import {WalletPageRoutingModule} from './wallet-page-routing.module'

@NgModule({
  declarations: [
    WalletPageComponent
  ],
  imports: [
    RouterModule,
    WalletPageRoutingModule
  ],
  exports: [
    WalletPageComponent
  ]
})
export class WalletPageModule { }
