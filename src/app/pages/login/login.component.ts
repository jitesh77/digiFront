import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { UrlService } from "../../services/url/url.service";
import { AlertService } from "../../services/url/alert.service";
import { UserService } from "../../services/user/user.service";
import { User } from "../../shared/models/user.model";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  url: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private urlService: UrlService,
    private alertService: AlertService,
    private userService: UserService,
    private _fms: FlashMessagesService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
    this.urlService.returnUrl.subscribe(message => (this.url = message));
  }

  /*==================== login fn ====================*/
  submitLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      res => {
        if (res.result) {
          // this.alertService.success(res.message, false);
          this._fms.show("Login Successful", {
            cssClass: "alert-success",
            timeout: 2000
          });
          this.userService.currentUser().subscribe(res => {
            if (res.data.username == undefined) {
              this.router.navigateByUrl("/signup/details");
            } else {
              this.router.navigateByUrl(this.url);
            }
          });
        } else {
          // console.log(res.message);
          // this.alertService.error(res.message, false);
          this._fms.show(res.message, {
            cssClass: "alert-danger",
            timeout: 2000
          });
        }
      },
      err => console.log(err)
    );
  }

  // submitLogin() {
  //   localStorage.setItem("name", "Austin");
  //   localStorage.setItem("isLoggedIn", "true");
  //   this.router.navigateByUrl("/");
  // }

  // logoutUser() {
  //   this.authService.logout().subscribe(res => {
  //     console.log("logged out");
  //     console.log(res);
  //   });
  // }
}
