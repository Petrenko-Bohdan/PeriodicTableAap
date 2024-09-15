import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeriodicTableComponent } from './periodic-table/periodic-table.component';
import { EditElementDialogComponent } from './edit-element-dialog/edit-element-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PeriodicTableComponent, EditElementDialogComponent, CommonModule, MatTableModule, MatInputModule, MatButtonModule, MatDialogModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  
}
