import {Component, OnDestroy, OnInit} from '@angular/core';
import UserService from '../services/user.service';
import User from '../entities/user.entity';
import AuthService from '../services/auth.service';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy  {

  public loggedIn: boolean = false;

  private readonly subs = new Subject<void>();

  constructor(private readonly userService: UserService,
              private readonly authService: AuthService) {
  }

  public ngOnInit(): void {
    this.userService.currentUserService.getCurrentUserAsObservable()
      .pipe(takeUntil(this.subs))
      .subscribe((user: User | null) => {
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
