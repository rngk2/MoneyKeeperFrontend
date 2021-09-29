import { ChangeDetectionStrategy, Component } from '@angular/core';

import ITransaction, { INPUT_TRANSACTION_NAME } from '../../entities/transaction.entity';

@Component({
  selector: 'earnings-page',
  templateUrl: './earnings-page.component.html',
  styleUrls: ['./earnings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EarningsPageComponent {
  public readonly filter = (value: ITransaction) => value.categoryName === INPUT_TRANSACTION_NAME;
}
