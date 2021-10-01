import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface ConfirmDialogData {
  readonly message: string;
  readonly onAnswer: (answer: 'yes' | 'no') => void;
}

@Component({
  selector: 'confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: ConfirmDialogData,
    private readonly dialogRef: MatDialogRef<ConfirmPopupComponent>
  ) {
  }

  public submit(answer: 'yes' | 'no'): void {
    this.data.onAnswer && this.data.onAnswer(answer);
    this.dialogRef.close();
  }
}
