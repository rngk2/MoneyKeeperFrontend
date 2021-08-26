import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent {

  @Output() public onAnswer = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public readonly message: string,
              private readonly dialogRef: MatDialogRef<ConfirmPopupComponent>) {
  }

  response(answer: 'yes' | 'no'): void {
    this.onAnswer.emit(answer === 'yes');
    this.dialogRef.close();
  }
}
