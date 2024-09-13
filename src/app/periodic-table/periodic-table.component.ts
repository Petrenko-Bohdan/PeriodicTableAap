import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../models/periodic-element.model';
import { ElementDataService } from '../services/element-data.service';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent {
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource: PeriodicElement[] = [];

  constructor(private elementDataService: ElementDataService) {}

  ngOnInit() {
    this.elementDataService.elements$.subscribe((data) => {
      this.dataSource = data;
    });
  }
}
