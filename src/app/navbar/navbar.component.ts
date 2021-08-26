import {Component, OnInit} from '@angular/core';
import UserService from '../services/user.service';
import User from '../entities/user.entity';
import AuthService from '../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean = false;

  constructor(private readonly userService: UserService,
              private readonly authService: AuthService) {
  }

  public ngOnInit(): void {
    this.userService.currentUserService.getCurrentUserAsObservable().subscribe((user: User | null) => {
      this.loggedIn = !!user;
    });
  }

  public signOut(): void {
    this.authService.logOut();
  }
}
