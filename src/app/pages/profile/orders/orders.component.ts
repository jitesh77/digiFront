import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../../services/user/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Rating } from "../../../shared/models/rating.model";
@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  id: string;
  type: string;
  orderData: any;
  clientData: any;
  status: number;
  ratingForm: FormGroup;
  authorUser = false;
  reviewData: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.ratingForm = this.fb.group({
      rating: ["", [Validators.required]],
      review: ["", [Validators.required]]
    });

    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.type = params["type"];
      if (this.type == "microjob") {
        this.getOrderDetails("microjob", this.id);
      }
      if (this.type == "hourly") {
        this.getOrderDetails("hourly", this.id);
      }
      // if (this.type == "microjob") {
      //   this.getOrderDetails("microjob", this.id);
      // }
    });
  }

  getOrderDetails(type, id) {
    this.userService.getMySingleOrder(type, id).subscribe(
      res => {
        console.log(res);
        if (res.result) {
          this.orderData = res.data;
          this.status = this.orderData.status;
          if (this.status > 2) {
            this.getReviews(this.orderData._id);
          }
          if (
            res.data.senderUserName ==
            JSON.parse(localStorage.getItem("currentUser")).username
          ) {
            this.authorUser = true;
          }
          // this.getClientDetails(this.orderData.senderId);
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  //  not used
  getClientDetails(id) {
    this.userService.getUserBox(id).subscribe(res => {
      if (res.result) {
        this.clientData = res.data;
        console.log(this.clientData);
      }
    });
  }

  acceptOrder() {
    this.userService.acceptOrder(this.type, this.id).subscribe(
      res => {
        if (res.result) {
          this.status = 2;
          console.log(res.message);
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  diclineOrder() {
    this.userService.declineOrder(this.type, this.id).subscribe(
      res => {
        if (res.result) {
          console.log(res.message);
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  completeOrder(by) {
    this.userService.completeOrder(this.type, this.id, by).subscribe(
      res => {
        this.status = 3;
        if (res.result) {
          console.log(res.message);
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  disputeOrder(by) {
    this.status = -1;
    this.userService.disputeOrder(this.type, this.id, by).subscribe(
      res => {
        if (res.result) {
          console.log(res.message);
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getReviews(id) {
    this.userService.getReviews("order", id).subscribe(
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

  onSubmit({ value }: { value: Rating }) {
    value["type"] = this.type;
    value["orderId"] = this.orderData._id;
    value["jobId"] = this.orderData.jobId;
    value["jobAuthorId"] = this.orderData.authorId;
    if (this.authorUser == true) {
      value["receiverFname"] = this.orderData.authorFname;
      value["receiverId"] = this.orderData.authorId;
      this.userService.addRating(value).subscribe(res => {
        if (res.result) {
          console.log(res.message);
        } else {
          console.log(res.message);
        }
      });
    } else {
      value["receiverFname"] = this.orderData.senderFname;
      value["receiverId"] = this.orderData.senderId;
      this.userService.addRating(value).subscribe(res => {
        if (res.result) {
          console.log(res.message);
        } else {
          console.log(res.message);
        }
      });
    }
  }
}
