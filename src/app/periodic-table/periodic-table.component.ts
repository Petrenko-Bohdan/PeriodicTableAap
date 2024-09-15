import { Component, OnInit,  } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../models/periodic-element.model';
import { ElementDataService } from '../services/element-data.service';
import { Observable, takeUntil, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EditElementDialogComponent } from '../edit-element-dialog/edit-element-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent implements OnInit {
  public displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];
  public dataSource: Observable<PeriodicElement[]>;
	public filterControl = new FormControl('');
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private elementDataService: ElementDataService,
    public dialog: MatDialog
  ) {
    this.dataSource = this.elementDataService.elements$;

		this.filterControl.valueChanges.pipe(debounceTime(2000),
		distinctUntilChanged()
		).subscribe(searchTerm => {
			this.elementDataService.setFilter(searchTerm ?? '');
		})
  }

  ngOnInit() {
    this.elementDataService.loadElements();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  editElement(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      data: element,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if (result) {
          this.elementDataService.updateElement(result);
        }
      });
  }
}
