import {Component, OnDestroy, OnInit} from '@angular/core';
import AuthService from '../services/auth.service';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import UserStore from "../store/user/user.store";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy  {

  public loggedIn: boolean = false;

  private readonly subs = new Subject<void>();

  constructor(private readonly userStore: UserStore,
              private readonly authService: AuthService,) {
  }

  public ngOnInit(): void {
    this.userStore.getUser()
      .pipe(takeUntil(this.subs))
      .subscribe((user) => {
        this.loggedIn = !!user;
    });
  }

  public signOut(): void {
    this.authService.logOut();
  }

  public ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
  }
}
