import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../../services/home/home.service";
import { UserService } from "../../services/user/user.service";
import { EditService } from "../../services/url/edit.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { MicrojobOrder } from "../../shared/models/microjob.model";
declare const $: any;
@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  /*==================== variables====================*/
  microjob: any;

  id: any;
  authorDetails: any;
  list = [];
  isLoading = true;
  authorUser = false;
  postOrder = true;
  orderMicrojob: FormGroup;
  loggedIn = false;
  reviewData: Array<any>;
  room: string;
  /*==================================================*/
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private editService: EditService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getMicrojob(this.id);
      this.getReviews(this.id);
    });

    this.orderMicrojob = this.fb.group({
      title: ["", [Validators.required]],
      duration: ["", [Validators.required]],
      description: ["", [Validators.required]]
    });
  }

  getMicrojob(id) {
    this.homeService.getSingleMicrojob(id).subscribe(res => {
      if (res.result) {
        this.microjob = res.data;
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

  onSubmit({ value }: { value: MicrojobOrder }) {
    this.postOrder = false;
    value["authorId"] = this.authorDetails._id;
    value["jobId"] = this.microjob._id;
    value["microjobTitle"] = this.microjob.title;
    value["authorFname"] = this.microjob.authorFname;
    value["authorUserName"] = this.microjob.authorUserName;
    this.userService.postMicrojobOrder(value).subscribe(
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

  onEdit() {
    this.editService.currentData(this.microjob);
    this.router.navigateByUrl("/dashboard/edit/job_post/" + this.microjob._id);
  }

  orderModal() {
    this.userService.currentUser().subscribe(
      res => {
        if (res.result) {
          this.loggedIn = true;
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
