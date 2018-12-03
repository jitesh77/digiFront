import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user/user.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}
  microjobsData: any;
  hourliesData: any;
  requestData: any;
  ngOnInit() {
    this.spinner.show();
    this.getMicrojobs();
    this.getHourlies();
    this.getBuyerRequests();
  }

  getMicrojobs() {
    this.userService.getMicrojobs(1, 8).subscribe(res => {
      if (res.result) {
        this.microjobsData = res.data;
        console.log(this.microjobsData);
      } else {
        console.log(res.message);
      }
    });
  }

  getHourlies() {
    this.userService.getHourlies(1, 8).subscribe(res => {
      if (res.result) {
        this.hourliesData = res.data;
      } else {
        console.log(res.message);
      }
    });
  }

  getBuyerRequests() {
    this.userService.getBuyerRequests(1, 6).subscribe(res => {
      if (res.result) {
        this.requestData = res.data;
        this.spinner.hide();
      } else {
        console.log(res.message);
      }
    });
  }
}
