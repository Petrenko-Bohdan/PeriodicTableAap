import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PeriodicElement } from '../models/periodic-element.model';
import { ELEMENT_DATA } from '../../assets/data';

@Injectable({
  providedIn: 'root',
})
export class ElementDataService {
  private elementSubject = new BehaviorSubject<PeriodicElement[]>([]);
	public elements$ = this.elementSubject.asObservable();

  constructor() {
    this.loadElements();
  }

  private loadElements() {
    setTimeout(() => {
      this.elementSubject.next(ELEMENT_DATA);
    }, 2000);
  }
}
