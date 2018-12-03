import { Component, OnInit } from "@angular/core";
import { HomeService } from "../../services/home/home.service";
import { UserService } from "../../services/user/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-buyer-req",
  templateUrl: "./buyer-req.component.html",
  styleUrls: ["./buyer-req.component.css"]
})
export class BuyerReqComponent implements OnInit {
  requestData: any;
  sub: any;
  page: any;
  message: string;
  list = true;
  name = "Buyer Requests";
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.page = params["page"];
      this.page = parseInt(this.page);
      if (this.page < 1) {
        this.page = 1;
      }
    });
  }
  ngOnInit() {
    this.getBuyerRequests(this.page);
  }
  receivePage($event) {
    this.page = $event;
    if (this.page < 1) {
      this.page = 1;
    }
    this.router.navigateByUrl("/buyer_requests/" + this.page);
    this.getBuyerRequests(this.page);
  }
  getBuyerRequests(page) {
    this.userService.getBuyerRequests(page, 10).subscribe(res => {
      console.log(res);
      if (res.result) {
        this.requestData = res.data;
        this.message = "";
        // this.spinner.hide();
      } else {
        // console.log(res.message);
        this.requestData = [];
        this.message = res.message;
      }
    });
  }
}
