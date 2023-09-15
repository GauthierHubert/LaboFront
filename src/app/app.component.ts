import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './services/data/data.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LaboFinalFront';

  navbarIsActive ?: Boolean;
  private subscription ?: Subscription;

  constructor(private _dataService : DataService, private primengConfig : PrimeNGConfig){

    this.subscription = this._dataService.navbarObs$.subscribe(value => {
      this.navbarIsActive = value;
      });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  navbarIsDisplay(event : MouseEvent) {

    this.subscription = this._dataService.navbarObs$.subscribe(value => {
      this.navbarIsActive = value;
      });
  }
}
