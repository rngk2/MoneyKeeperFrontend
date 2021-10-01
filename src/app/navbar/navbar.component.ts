import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from "rxjs";
import IUser from "../entities/user.entity";

import UserStore from "../store/user/user.store";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  public readonly user$: Observable<IUser | undefined>;

  constructor(
    private readonly userStore: UserStore
  ) {
    this.user$ = userStore.user;
  }

  public logOut(): void {
    this.userStore.logOut();
  }
}
