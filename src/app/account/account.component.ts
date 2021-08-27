import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {authFormsSlider} from "./route-animations";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [authFormsSlider]
})
export class AccountComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRoute
      && outlet.activatedRouteData.animation;
  }
}

