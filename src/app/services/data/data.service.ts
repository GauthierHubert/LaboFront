import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _navbarIsActiveSource = new BehaviorSubject<Boolean>(true);

  navbarObs$ = this._navbarIsActiveSource.asObservable();

  updateVariable(isActive : boolean){
    this._navbarIsActiveSource.next(isActive);
  }
}
