import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'all-transactions-page',
  templateUrl: './all-transactions-page.component.html',
  styleUrls: ['./all-transactions-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTransactionsPageComponent {
}
