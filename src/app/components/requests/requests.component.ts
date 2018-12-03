import { Component, OnInit, Input } from "@angular/core";
import { HomeService } from "../../services/home/home.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user/user.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.css"]
})
export class RequestsComponent implements OnInit {
  @Input() requestData: any;
  @Input() message: any;
  @Input() list: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    // route.params.subscribe(val => {
    //   // put the code from `ngOnInit` here
    // });
  }

  ngOnInit() {
    // this.spinner.show();
    // this.getBuyerRequests();
  }

  // getBuyerRequests() {
  //   this.userService.getBuyerRequests(1, 50).subscribe(res => {
  //     if (res.result) {
  //       this.requestData = res.data;
  //       this.spinner.hide();
  //     } else {
  //       console.log(res.message);
  //     }
  //   });
  // }
}
