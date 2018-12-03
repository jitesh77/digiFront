import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user/user.service";
@Component({
  selector: "app-my-hourlies",
  templateUrl: "./my-hourlies.component.html",
  styleUrls: ["./my-hourlies.component.css"]
})
export class MyHourliesComponent implements OnInit {
  myHourlies: any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getMyHourlies();
  }
  getMyHourlies() {
    this.userService.getMyHourlies().subscribe(
      res => {
        if (res.result) {
          this.myHourlies = res.data;
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
