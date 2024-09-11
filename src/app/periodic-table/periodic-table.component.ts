import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../periodic-element';
import { ELEMENT_DATA } from '../../assets/data';


@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss'
})
export class PeriodicTableComponent {
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	dataSource = ELEMENT_DATA;
}
