import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../models/periodic-element.model';
import { ElementDataService } from '../services/element-data.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EditElementDialogComponent } from '../edit-element-dialog/edit-element-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent implements OnInit {
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  public dataSource: Observable<PeriodicElement[]>;

  constructor(private elementDataService: ElementDataService, public dialog:MatDialog) {
		this.dataSource = this.elementDataService.elements$;
	}

  ngOnInit() {
    this.elementDataService.loadElements();
  }
	
	editElement(element: PeriodicElement): void {
		const dialogRef = this.dialog.open(EditElementDialogComponent,{
			data: element
		});

		dialogRef.afterClosed().subscribe(result=>{if(result){this.elementDataService.updateElement(result)}});
	}
}
