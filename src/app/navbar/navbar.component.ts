import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from "@ngneat/until-destroy";

import UserStore from "../store/user/user.store";

@UntilDestroy()
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean = false;


  constructor(
    private readonly userStore: UserStore
  ) {
  }

  public ngOnInit(): void {
    this.userStore.getUser()
      .subscribe((user) => {
        this.loggedIn = !!user;
      });
  }

  public logOut(): void {
    this.userStore.logOut();
  }
}
