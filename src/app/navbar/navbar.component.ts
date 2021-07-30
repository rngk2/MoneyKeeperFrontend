import { Component, OnInit } from '@angular/core';
import {Observer} from "rxjs";
import UserService from "../services/user.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService
      .isLoggedIn()
      .subscribe(loggedIn => this.loggedIn = loggedIn)
  }
}
