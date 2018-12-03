import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class UserDataService {
  private user = new BehaviorSubject({});
  returnUser = this.user.asObservable();

  constructor() {}
  currentUser(userData: object) {
    this.user.next(userData);
  }
}
