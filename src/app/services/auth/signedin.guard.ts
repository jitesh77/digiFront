import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root"
})
export class SignedinGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.getCurrentUser()
      .then(res => {
        return true;
      })
      .catch(err => {
        this.router.navigateByUrl("/dashboard");
        return false;
      });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      this.userService.currentUser().subscribe(res => {
        // localStorage.setItem("user", JSON.stringify(res));
        if (!res.result) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }
}
