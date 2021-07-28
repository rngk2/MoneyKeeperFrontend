import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {authFormsSlider} from "./route-animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    authFormsSlider
  ]
})
export class AppComponent {
  title = 'MoneyKeeperFrontend';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRoute
      && outlet.activatedRouteData.animation
  }

}
