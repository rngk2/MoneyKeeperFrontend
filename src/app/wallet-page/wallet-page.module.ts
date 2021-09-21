import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WalletPageRoutingModule } from './wallet-page-routing.module';
import { WalletPageComponent } from './wallet-page.component';

@NgModule({
  declarations: [
    WalletPageComponent
  ],
  imports: [
    WalletPageRoutingModule,
    RouterModule,
  ],
  exports: [
    WalletPageComponent
  ]
})
export class WalletPageModule {
}
