import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import "rxjs/add/observable/of";

// import user services it contains all the req for user data
import { User } from "../../shared/models/user.model";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  /*==================== variables ====================*/
  currentUser: User = new User();
  loggedIn = false;
  isAdmin = false;

  constructor(private http: HttpClient, private userService: UserService) {}

  /* ============================================================
     ==================== login ================================*/
  login(emailPassword) {
    localStorage.clear();
    return this.userService.userLogin(emailPassword).pipe(
      map(res => {
        if (res.result) {
          // console.log("wow");
          this.addDataToStorage(res.data);
        }
        return res;
      })
    );
  }

  /* ============================================================
     ==================== logout ================================*/
  logout() {
    localStorage.clear();
    return this.userService.userLogout().pipe(
      map(res => {
        return res;
      })
    );
  }

  /* ================================================================================
     ==================== add logged in user data to localstorage====================*/

  addDataToStorage(loggedUser) {
    this.loggedIn = true;
    this.currentUser.email = loggedUser.email;
    this.currentUser.fname = loggedUser.fname;
    this.currentUser.lname = loggedUser.lname;
    this.currentUser.profilePicture = loggedUser.profilePicture;
    this.currentUser.username = loggedUser.username;
    this.currentUser.id = loggedUser._id;

    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    localStorage.setItem("loggedIn", JSON.stringify(this.loggedIn));
  }
}
