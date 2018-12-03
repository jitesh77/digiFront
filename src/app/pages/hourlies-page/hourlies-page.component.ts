import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../../services/home/home.service";
import { UserService } from "../../services/user/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { HourlyOrder } from "../../shared/models/hourly.model";
declare const $: any;
@Component({
  selector: "app-hourlies-page",
  templateUrl: "./hourlies-page.component.html",
  styleUrls: ["./hourlies-page.component.css"]
})
export class HourliesPageComponent implements OnInit {
  /*==================== variables====================*/
  hourly: any;
  id: any;
  authorDetails: any;
  list = [];
  isLoading = true;
  authorUser = false;
  postOrder = true;
  orderHourly: FormGroup;
  reviewData: Array<any>;
  room: string;
  /*==================================================*/
  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getHourly(this.id);
      this.getReviews(this.id);
    });

    this.orderHourly = this.fb.group({
      title: ["", [Validators.required]],
      duration: ["", [Validators.required]],
      description: ["", [Validators.required]]
    });
  }

  getHourly(id) {
    this.homeService.getSingleHourly(id).subscribe(res => {
      if (res.result) {
        this.hourly = res.data;
        console.log(this.hourly);
        if (localStorage.getItem("currentUser") != null) {
          if (
            res.data.authorUserName ==
            JSON.parse(localStorage.getItem("currentUser")).username
          ) {
            this.authorUser = true;
          }
        }
        this.getAuthorDetails(res.data.authorId);
      } else {
        console.log(res.message);
      }
    });
  }

  getAuthorDetails(id) {
    this.userService.getUserBox(id).subscribe(
      res => {
        if (res.result) {
          this.isLoading = false;
          this.authorDetails = res.data;
          this.spinner.hide();
          // console.log(this.authorDetails);
          for (let index = 0; index < this.authorDetails.rating; index++) {
            this.list[index] = true;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getReviews(id) {
    this.userService.getReviews("job", id).subscribe(
      res => {
        if (res.result) {
          this.reviewData = res.data;
          console.log(this.reviewData);
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit({ value }: { value: HourlyOrder }) {
    this.postOrder = false;
    value["authorId"] = this.authorDetails._id;
    value["jobId"] = this.hourly._id;
    value["hourlyTitle"] = this.hourly.title;
    value["authorFname"] = this.hourly.authorFname;
    value["authorUserName"] = this.hourly.authorUserName;
    this.userService.postHourlyOrder(value).subscribe(
      res => {
        if (res.result) {
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
