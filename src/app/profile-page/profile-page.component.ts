import { Component, OnInit } from '@angular/core';
import UserService from "../services/user.service";
import User from "../entities/user.entity";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public user: User | undefined

  constructor(private readonly userService: UserService) {
    userService.getCurrentUserAsObservable()
      .subscribe(user => this.user = user)
  }

  ngOnInit(): void {
  }

}
