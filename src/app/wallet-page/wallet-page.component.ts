import {Component} from '@angular/core';

@Component({
  selector: 'wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss']
})
export class WalletPageComponent {
  public showTransactions = false;
  public showCards = true;
}
