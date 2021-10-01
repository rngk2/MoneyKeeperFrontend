import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import TransactionsStore from "../../store/transactions/transactions.store";

@Component({
  selector: 'add-transaction-form',
  templateUrl: './add-transaction-form.component.html',
  styleUrls: ['./add-transaction-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTransactionFormComponent {

  public amount!: number;
  public comment!: string;
  public readonly timestampControl = new FormControl(new Date());
  public readonly minDate = new Date(0);
  public readonly maxDate = new Date();

  @Input() public categoryId!: number;

  @Output() public onSubmit = new EventEmitter();

  constructor(
    private readonly transactionsStore: TransactionsStore
  ) {
  }

  public addTransaction(): void {
    this.transactionsStore.createTransaction({
      categoryId: this.categoryId,
      amount: this.amount,
      timestamp: this.timestampControl.value,
      comment: this.comment
    });
    this.onSubmit.emit();
  }
}
