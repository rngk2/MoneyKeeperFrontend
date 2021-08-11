import UserService from "./services/user.service";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class Permissions {
  constructor(private userService: UserService) {
  }

  canActivate(): boolean {
    return this.userService.getCurrentUser().jwtToken !== undefined
  }
}

@Injectable()
export class CanActivateUserRoutes implements CanActivate {

  constructor(private readonly permissions: Permissions,
              private readonly router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const _canActivate = this.permissions.canActivate()
    if (_canActivate) {
      return true
    }
    else {
      this.router.navigate(['/sign-in'])
      return false
    }
  }
}
