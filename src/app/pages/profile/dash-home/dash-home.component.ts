import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user/user.service";
import { Router } from "@angular/router";
import { UserDataService } from "../../../services/url/user-data.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-dash-home",
  templateUrl: "./dash-home.component.html",
  styleUrls: ["./dash-home.component.css"]
})
export class DashHomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private userDataService: UserDataService,
    private spinner: NgxSpinnerService
  ) {}
  user: any;
  isLoading = true;
  jobsPostedCount: number;
  portfolioData: Array<any>;
  hourlyOrderData: Array<any>;
  microjobOrderData: Array<any>;
  requestOrderData: Array<any>;
  sentRequestData: Array<any>;
  sentHourlyData: Array<any>;
  sentMicrojobData: Array<any>;

  clickedPortfolio: any;
  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
    this.getCurrentUserData();
    this.getHourlyOrders();
    this.getMicrojobOrders();
    this.getRequestOrder();
    this.getSentRequestOrders();
    this.getSentHourlyOrders();
    this.getSentMicrojobOrder();
  }

  getCurrentUserData() {
    console.log("data" + this.hourlyOrderData);
    this.userService.currentUser().subscribe(res => {
      if (res.result) {
        this.user = res.data;
        console.log(this.user);
        this.jobsPostedCount =
          res.data.buyersRequest.length +
          res.data.hourly.length +
          res.data.microjobs.length;
        this.userDataService.currentUser(this.user);
        this.spinner.hide();
        this.isLoading = false;
        this.getPortfolio(this.user._id);
      } else {
        this.router.navigateByUrl("/login");
        localStorage.clear();
      }
    });
  }

  getPortfolio(id) {
    this.userService.getMyPortfolio(id).subscribe(
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

  getHourlyOrders() {
    this.userService.getMyHourlyOrders().subscribe(
      res => {
        if (res.result) {
          this.hourlyOrderData = res.data;
          this.hourlyOrderData.map(jobData => {
            if (jobData.status == 1) {
              jobData["orderStatus"] = "Pending";
              jobData["css"] = "text-warning";
            }
            if (jobData.status == 2) {
              jobData["orderStatus"] = "In Progress";
              jobData["css"] = "text-success";
            }
            if (jobData.status == 3) {
              jobData["orderStatus"] = "Completed";
              jobData["css"] = "text-info";
            }
          });
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getMicrojobOrders() {
    this.userService.getMyMicrojobOrders().subscribe(
      res => {
        if (res.result) {
          this.microjobOrderData = res.data;
          this.microjobOrderData.map(jobData => {
            if (jobData.status == 1) {
              jobData["orderStatus"] = "Pending";
              jobData["css"] = "text-warning";
            }
            if (jobData.status == 2) {
              jobData["orderStatus"] = "In Progress";
              jobData["css"] = "text-success";
            }
            if (jobData.status == 3) {
              jobData["orderStatus"] = "Completed";
              jobData["css"] = "text-info";
            }
          });
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getRequestOrder() {
    this.userService.getMyRequestOrders().subscribe(
      res => {
        if (res.result) {
          this.requestOrderData = res.data;
          this.requestOrderData.map(jobData => {
            if (jobData.status == 1) {
              jobData["orderStatus"] = "Pending";
              jobData["css"] = "text-warning";
            }
            if (jobData.status == 2) {
              jobData["orderStatus"] = "In Progress";
              jobData["css"] = "text-success";
            }
            if (jobData.status == 3) {
              jobData["orderStatus"] = "Completed";
              jobData["css"] = "text-info";
            }
          });
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getSentRequestOrders() {
    this.userService.getMySentOrders("request").subscribe(
      res => {
        if (res.result) {
          this.sentRequestData = res.data;
          this.sentRequestData.map(jobData => {
            if (jobData.status == 1) {
              jobData["orderStatus"] = "Pending";
              jobData["css"] = "text-warning";
            }
            if (jobData.status == 2) {
              jobData["orderStatus"] = "In Progress";
              jobData["css"] = "text-success";
            }
            if (jobData.status == 3) {
              jobData["orderStatus"] = "Completed";
              jobData["css"] = "text-info";
            }
          });
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getSentHourlyOrders() {
    this.userService.getMySentOrders("hourly").subscribe(
      res => {
        if (res.result) {
          this.sentHourlyData = res.data;
          this.sentHourlyData.map(jobData => {
            if (jobData.status == 1) {
              jobData["orderStatus"] = "Pending";
              jobData["css"] = "text-warning";
            }
            if (jobData.status == 2) {
              jobData["orderStatus"] = "In Progress";
              jobData["css"] = "text-success";
            }
            if (jobData.status == 3) {
              jobData["orderStatus"] = "Completed";
              jobData["css"] = "text-info";
            }
          });
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getSentMicrojobOrder() {
    this.userService.getMySentOrders("microjob").subscribe(
      res => {
        if (res.result) {
          this.sentMicrojobData = res.data;
          this.sentMicrojobData.map(jobData => {
            if (jobData.status == 1) {
              jobData["orderStatus"] = "Pending";
              jobData["css"] = "text-warning";
            }
            if (jobData.status == 2) {
              jobData["orderStatus"] = "In Progress";
              jobData["css"] = "text-success";
            }
            if (jobData.status == 3) {
              jobData["orderStatus"] = "Completed";
              jobData["css"] = "text-info";
            }
          });
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
}
