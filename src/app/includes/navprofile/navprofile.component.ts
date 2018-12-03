import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user/user.service";
import { AuthService } from "../../services/auth/auth.service";
@Component({
  selector: "app-navprofile",
  templateUrl: "./navprofile.component.html",
  styleUrls: ["./navprofile.component.css"]
})
export class NavprofileComponent implements OnInit {
  messageListData: Array<any> = [];
  notificationListData: Array<any> = [];
  currentUser: any;
  isLoggedin: false;
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.messageData();
  }
  logOut() {
    this.authService.logout().subscribe(
      res => {
        this.isLoggedin = false;
        this.router.navigateByUrl("/");
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  messageData() {
    this.userService.getMessageList().subscribe(res => {
      if (res.result) {
        this.messageListData = res.data;
        console.log(this.messageListData);
      }
    });
  }
}
