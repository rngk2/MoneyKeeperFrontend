import User from '../entities/user.entity';
import UserService from './user.service';
import {Injectable} from '@angular/core';

@Injectable()
export default class AuthService {

  constructor(private readonly userService: UserService) {
  }

  public logIn(credentials: { email: string, password: string }, cb?: () => void): void {
    this.userService.api.authenticateCreate({
      ...(credentials),
    }).subscribe(res => {
      //@ts-ignore
      const user: User = res.data as User;
      this.userService.currentUserService.setCurrentUser(user);
      this.startRefreshTokenTimer();
      cb && cb();
    });
  }

  public logOut(): void {
    this.userService.currentUserService.removeCurrentUser();
    this.stopRefreshTokenTimer();
  }

  public refreshToken(): void {/*
    <RefreshTokenResponse>*/this.userService.api.refreshTokenCreate()
      .subscribe(res => {
        this.userService.currentUserService.setCurrentUser({...this.userService.currentUserService.getCurrentUser(), jwtToken: res.data.newToken as string});
        this.startRefreshTokenTimer();
      });
  }

  // @ts-ignore
  private refreshTokenTimeout: NodeJS.Timeout;

  private startRefreshTokenTimer(): void {
    const token_ttl = (1000 * 60) * 5;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), token_ttl);
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }
};
