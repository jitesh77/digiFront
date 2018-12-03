import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ViewFlags } from "@angular/compiler/src/core";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  id: string;
  userData: Array<any> = [];
  portfolioData: Array<any> = [];
  room: string;
  clickedPortfolio: any;
  reviewData: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getUserProfile();
      this.getPortfolio();
    });
    this.getReviews();
  }

  getUserProfile() {
    this.userService.getUserBox(this.id).subscribe(
      res => {
        if (res.result) {
          this.userData = res.data;
          // console.log(this.userData);
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getPortfolio() {
    this.userService.getMyPortfolio(this.id).subscribe(
      res => {
        if (res.result) {
          this.portfolioData = res.data;
          console.log(this.portfolioData);
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  portfolioModal(data) {
    console.log(data);
    this.clickedPortfolio = data;
  }
  message() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser != null) {
      if (currentUser.id > this.id) {
        this.room = currentUser.id + this.id;
        this.router.navigateByUrl(`/messages/room/${this.room}/${this.id}`);
        // console.log(this.room);
      }
      if (this.id > currentUser.id) {
        this.room = this.id + currentUser.id;
        this.router.navigateByUrl(`/messages/room/${this.room}/${this.id}`);
      }
    }
  }

  getReviews() {
    this.userService.getReviews("user", this.id).subscribe(
      res => {
        if (res.result) {
          this.reviewData = res.data;
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
