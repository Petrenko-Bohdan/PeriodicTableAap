import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { PeriodicElement } from '../models/periodic-element.model';
import { ELEMENT_DATA } from '../../assets/data';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ElementDataService {
  private elementSubject: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject<PeriodicElement[]>([]);
  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  public elements$: Observable<PeriodicElement[]> = combineLatest([
    this.elementSubject.asObservable(),
    this.filterSubject.asObservable().pipe(debounceTime(2000))
  ]).pipe(
    map(([elements, filter]) => this.filterElements(elements, filter))
  );

  public loadElements(): void {
    setTimeout(() => {
      this.elementSubject.next(ELEMENT_DATA);
    }, 2000);
  }

  public updateElement(updatedElement: PeriodicElement): void {
    const elements = [...this.elementSubject.getValue()];
    const index = elements.findIndex(e => e.position === updatedElement.position);
    if (index !== -1) {
      elements[index] = updatedElement;
      this.elementSubject.next(elements);
    }
  }

  public setFilter(filter: string): void {
    this.filterSubject.next(filter);
  }

  private filterElements(elements: PeriodicElement[], filter: string): PeriodicElement[] {
    if (!filter) {
      return elements;
    }
    const lowerCaseFilter = filter.toLowerCase();
    return elements.filter(element =>
      Object.values(element).some(value =>
        value.toString().toLowerCase().includes(lowerCaseFilter)
      )
    );
  }
}