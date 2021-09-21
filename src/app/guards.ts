import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import UserStore from "./store/user/user.store";

@Injectable()
export class Permissions {
  constructor(private readonly userStore: UserStore) {
  }

  canActivate(): Observable<boolean> {
    return this.userStore.getUser()
      .pipe(map(user => !!user));
  }
}

@Injectable()
export class CanActivateUserRoutes implements CanActivate {

  constructor(private readonly permissions: Permissions,
              private readonly router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.permissions.canActivate()
      .pipe(map(can => {
        if (!can) {
          this.router.navigate(['/sign-in']);
        }
        return can;
      }));
  }
}
