import { Component, OnInit } from '@angular/core';
import UserService from "../services/user.service";
import User from "../entities/user.entity";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((data: User) => {
      console.log("navd: ", data)
      if (data.jwtToken)
          this.loggedIn = true

    })
  }
}
