import {Component, OnInit} from '@angular/core';
import UserService from "../services/user.service";
import User from "../entities/user.entity";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean = false

  constructor(private readonly userService: UserService) { }

  public ngOnInit(): void {
    this.userService.getCurrentUserAsObservable().subscribe((user: User) => {
      this.loggedIn = !!user.jwtToken
    })
  }

  public signOut(): void {
    this.userService.logOut()
  }
}
