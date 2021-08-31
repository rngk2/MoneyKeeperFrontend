import {Component} from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss']
})
export class WalletPageComponent {
  constructor(router: Router) {
    router.navigate(['/wallet/categories'])
  }
}
