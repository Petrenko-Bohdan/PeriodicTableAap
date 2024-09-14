
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../models/periodic-element.model';


@Component({
  selector: 'app-edit-element-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './edit-element-dialog.component.html',
  styleUrl: './edit-element-dialog.component.scss',
})
export class EditElementDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
  ) {
    this.form = this.fb.group({
			position: [data.position],
      name: [data.name],
      weight: [data.weight],
      symbol: [data.symbol],
    });
  }

  onSave(): void {
    this.dialogRef.close(this.form.value);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
