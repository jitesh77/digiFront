import { Component, OnInit, OnChanges } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { ApiService } from "../../services/api/api.service";
import { UrlService } from "../../services/url/url.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isLoggedin = false;
  currentUser: string;
  categories: any;
  returnUrl: string;
  url: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private urlService: UrlService
  ) {
    route.params.subscribe(val => {
      this.checkLoggedInUser();
      this.getAllCategories();
      this.returnUrl = this.router.url;
      this.getUrl();
      this.setUrl();
    });
  }

  ngOnInit() {}

  getUrl() {
    this.urlService.returnUrl.subscribe(message => (this.url = message));
  }
  setUrl() {
    this.urlService.currentUrl(this.returnUrl);
  }

  checkLoggedInUser() {
    this.isLoggedin = JSON.parse(localStorage.getItem("loggedIn"));
    if (this.isLoggedin != undefined) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser")).fname;
    }
    // console.log(this.isLoggedin);
  }

  getAllCategories() {
    this.apiService.getCategories().subscribe(
      res => {
        this.categories = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  logOut() {
    this.authService.logout().subscribe(
      res => {
        this.isLoggedin = false;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
