import { Component, OnInit } from '@angular/core';
import {Observer} from "rxjs";
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
      if (data.accessToken)
          this.loggedIn = true
    })
  }
}
