import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user/user.service";

@Component({
  selector: "app-my-buyerrequests",
  templateUrl: "./my-buyerrequests.component.html",
  styleUrls: ["./my-buyerrequests.component.css"]
})
export class MyBuyerrequestsComponent implements OnInit {
  buyerRequests: any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getMyBuyerRequests();
  }

  getMyBuyerRequests() {
    this.userService.getMyBuyerRequests().subscribe(
      res => {
        if (res.result) {
          this.buyerRequests = res.data;
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  delete(id) {
    this.userService.deletePost("BuyerRequest", id).subscribe(res => {
      if (res.result) {
        console.log("deleted");
      } else {
        console.log(res.message);
      }
    });
  }
}
