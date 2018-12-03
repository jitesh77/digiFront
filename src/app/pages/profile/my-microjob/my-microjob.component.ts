import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user/user.service";

@Component({
  selector: "app-my-microjob",
  templateUrl: "./my-microjob.component.html",
  styleUrls: ["./my-microjob.component.css"]
})
export class MyMicrojobComponent implements OnInit {
  myMicrojobs: any;
  sub: any;
  type: string;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getMyMicrojobs();
  }

  getMyMicrojobs() {
    this.userService.getMyMicrojobs().subscribe(
      res => {
        if (res.result) {
          this.myMicrojobs = res.data;
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
