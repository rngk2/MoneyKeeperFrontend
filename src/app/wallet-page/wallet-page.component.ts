import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletPageComponent {
  constructor(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd && e.url.endsWith('wallet')) {
        router.navigate(['/wallet/categories']);
      }
    });
  }
}
