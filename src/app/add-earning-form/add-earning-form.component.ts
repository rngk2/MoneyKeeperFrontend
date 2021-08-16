import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'add-earning-form',
  templateUrl: './add-earning-form.component.html',
  styleUrls: ['./add-earning-form.component.scss']
})
export class AddEarningFormComponent implements OnInit {

  public timestampControl = new FormControl(new Date())
  public minDate = new Date(0)
  public maxDate = new Date()
  public amount!: number
  public comment!: string;

  constructor(private readonly dialogRef: MatDialogRef<AddEarningFormComponent>) { }

  ngOnInit(): void {
  }

  public submit(): void {
  }
}
