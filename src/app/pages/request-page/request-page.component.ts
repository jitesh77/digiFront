import { Component, OnInit } from "@angular/core";
import { HomeService } from "../../services/home/home.service";
import { UserService } from "../../services/user/user.service";
import {
  BuyerRequest,
  BuyerRequestModel
} from "../../shared/models/buyersRequest.model";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserDataService } from "../../services/url/user-data.service";
declare const $: any;
@Component({
  selector: "app-request-page",
  templateUrl: "./request-page.component.html",
  styleUrls: ["./request-page.component.css"]
})
export class RequestPageComponent implements OnInit {
  requests: any;
  single: string = "single";
  prmSub: any;
  id: any;
  authorDetails: any;
  isLoading = true;
  authorUser = false;
  postOrder = true;
  orderRequests: FormGroup;
  room: string;
  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {
    // this.spinner.show();
    this.getParams();

    this.orderRequests = this.fb.group({
      title: ["", [Validators.required]],
      duration: ["", [Validators.required]],
      description: ["", [Validators.required]]
    });
  }

  getParams() {
    this.prmSub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getBuyersRequest(this.id);
    });
  }

  getBuyersRequest(id) {
    this.homeService.getSingleBuyerRequest(id).subscribe(
      res => {
        if (res.result) {
          this.requests = res.data;
          if (localStorage.getItem("currentUser") != null) {
            if (
              res.data.authorUserName ==
              JSON.parse(localStorage.getItem("currentUser")).username
            ) {
              this.authorUser = true;
            }
          }

          this.getAuthorDetails(res.data.authorId);
          // console.log(this.requests);
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getAuthorDetails(id) {
    this.userService.getUserBox(id).subscribe(
      res => {
        console.log(res);
        if (res.result) {
          this.isLoading = false;
          this.spinner.hide();
          this.authorDetails = res.data;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit({ value }: { value: BuyerRequestModel }) {
    value["authorId"] = this.authorDetails._id;
    value["jobId"] = this.requests._id;
    value["microjobTitle"] = this.requests.title;
    value["authorFname"] = this.requests.authorFname;
    value["authorUserName"] = this.requests.authorUserName;
    this.userService.postRequestOrder(value).subscribe(
      res => {
        if (res.result) {
          this.postOrder = false;
          console.log(res);
        } else {
          console.log(res);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  orderModal() {
    this.userService.currentUser().subscribe(
      res => {
        if (res.result) {
          $("#exampleModal").modal("show");
        } else {
          this.router.navigateByUrl("/login");
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  messages() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser != null) {
      if (currentUser.id > this.authorDetails._id) {
        this.room = currentUser.id + this.authorDetails._id;
        this.router.navigateByUrl(
          `/messages/room/${this.room}/${this.authorDetails._id}`
        );
        // console.log(this.room);
      }
      if (this.authorDetails._id > currentUser.id) {
        this.room = this.authorDetails._id + currentUser.id;
        this.router.navigateByUrl(
          `/messages/room/${this.room}/${this.authorDetails._id}`
        );
      }
    }
  }
}
