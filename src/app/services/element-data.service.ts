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

  public loadElements() {
    setTimeout(() => {
      this.elementSubject.next(ELEMENT_DATA);
    }, 2000);
  }

	updateElement(updatedElement: PeriodicElement){
		const elements = this.elementSubject.getValue();
		const index = elements.findIndex(e=>e.position === updatedElement.position);

		if(index !== -1){
			elements[index] = updatedElement;
			this.elementSubject.next(elements);
		}
	}
}
