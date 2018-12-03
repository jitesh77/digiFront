import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../services/user/user.service";
@Component({
  selector: "app-reset",
  templateUrl: "./reset.component.html",
  styleUrls: ["./reset.component.css"]
})
export class ResetComponent implements OnInit {
  password: string;
  confirm: string;
  token: string;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params["token"];
    });
  }

  onSubmit() {
    this.userService
      .resetPassword(this.password, this.confirm, this.token)
      .subscribe(res => {
        console.log(res);
      });
  }
}
