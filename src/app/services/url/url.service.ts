import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UrlService {
  private url = new BehaviorSubject("/");
  returnUrl = this.url.asObservable();
  tempMessage: string;

  constructor() {}

  currentUrl(message: string) {
    this.returnUrl.subscribe(oldMessage => (this.tempMessage = oldMessage));
    if (message == "/login" || message == "/signup") {
      this.url.next(this.tempMessage);
    } else {
      this.url.next(message);
    }
  }
}
