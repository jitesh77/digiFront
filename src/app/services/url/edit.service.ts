import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EditService {
  private data = new BehaviorSubject("");
  returnData = this.data.asObservable();
  constructor() {}

  currentData(dataObject) {
    this.data.next(dataObject);
    // console.log(this.returnData);
  }
}
