import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { Signup } from "../../shared/models/signup.model";
import { UserService } from "../../services/user/user.service";
import { AuthService } from "../../services/auth/auth.service";
import { AlertService } from "../../services/url/alert.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signup: FormGroup;
  message: string;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private _fms: FlashMessagesService
  ) {}

  ngOnInit() {
    this.signup = this.fb.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
        tnc: [false, Validators.requiredTrue]
      },
      { validator: this.passwordConfirming }
    );
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get("password").value !== c.get("confirmPassword").value) {
      return { invalid: true };
    }
  }

  onSubmit({ value, valid }: { value: Signup; valid: boolean }) {
    this.userService.userSignup(value).subscribe(res => {
      if (res.result) {
        this._fms.show("Signup Successfull Now You Can Login", {
          cssClass: "alert-success",
          timeout: 2000
        });
        this.userService.currentUser().subscribe(res => {
          if (res.result) {
            this.authService.addDataToStorage(res.data);
            this.router.navigateByUrl("/signup/details");
          }
        });
      } else {
        let message = res.message;
        this._fms.show(res.message, {
          cssClass: "alert-danger",
          timeout: 2000
        });
      }
      err => {
        console.log(err);
      };
    });
  }
}
