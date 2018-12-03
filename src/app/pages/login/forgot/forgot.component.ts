import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user/user.service";
@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.css"]
})
export class ForgotComponent implements OnInit {
  email: string;
  constructor(private userService: UserService) {}

  ngOnInit() {}

  onSubmit() {
    this.userService.forgotPassword(this.email).subscribe(res => {
      console.log(res);
    });
  }
}
