import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BuyerRequest } from "../../../shared/models/buyersRequest.model";
import { ApiService } from "../../../services/api/api.service";
import { UserService } from "../../../services/user/user.service";
import { HomeService } from "../../../services/home/home.service";
import { AlertService } from "../../../services/url/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-request-post",
  templateUrl: "./request-post.component.html",
  styleUrls: ["./request-post.component.css"]
})
export class RequestPostComponent implements OnInit {
  requestjob: FormGroup;
  categoryList: any;
  allTagList: any;
  subCategoryList: any;
  id: any;
  dataEdit: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private userService: UserService,
    private alertService: AlertService,
    private homeService: HomeService,
    private router: Router,
    private route: ActivatedRoute,
    private _fms: FlashMessagesService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getTags();
    this.requestjob = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(4)]],
      description: ["", [Validators.required, Validators.minLength(5)]],
      budget: ["", Validators.required],
      tags: ["", Validators.required],
      duration: ["", Validators.required],
      category: ["", Validators.required],
      subCategory: ["", Validators.required]
    });
    this.onChanges();
    this.route.params.subscribe(params => {
      this.id = params["id"];
      if (this.id != undefined) {
        this.getRequest(this.id);
      }
    });
  }

  getCategories() {
    this.apiService.getCategories().subscribe(
      res => {
        this.categoryList = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getTags() {
    this.apiService.getAllSubCategories().subscribe(
      res => {
        this.allTagList = res.data;
        console.log(this.allTagList);
      },
      err => {
        console.log(err);
      }
    );
  }
  onSubmit({ value, valid }: { value: BuyerRequest; valid: boolean }) {
    value["brDescription"] = value.description.replace(/\r?\n/g, "<br />");
    if (this.id != undefined) {
      value["id"] = this.id;
      console.log(value);
      this.userService.updateBuyerRequest(value).subscribe(res => {
        if (res.result) {
          this._fms.show(res.message, {
            cssClass: "alert-success",
            timeout: 2000
          });
          this.router.navigateByUrl("/dashboard/myBuyerRequests");
        }
      });
    } else {
      this.userService.postBuyerRequest(value).subscribe(
        res => {
          if (res.result) {
            this._fms.show(res.message, {
              cssClass: "alert-success",
              timeout: 2000
            });
            this.router.navigateByUrl("/dashboard/myBuyerRequests");
          } else {
            this._fms.show(res.message, {
              cssClass: "alert-danger",
              timeout: 2000
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  onChanges(): void {
    this.requestjob.get("category").valueChanges.subscribe(val => {
      this.apiService.getSubCategory(val._id).subscribe(
        res => {
          if (res.result) {
            this.subCategoryList = res.data;
          } else {
            this.subCategoryList = "";
          }
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getRequest(id) {
    this.homeService.getSingleBuyerRequest(id).subscribe(res => {
      if (res.result) {
        this.dataEdit = res.data;
        this.requestjob.patchValue({
          title: this.dataEdit.title,
          description: this.dataEdit.description,
          budget: this.dataEdit.budget,
          tags: this.dataEdit.tags,
          duration: this.dataEdit.duration,
          category: this.dataEdit.category,
          subCategory: this.dataEdit.subCategory
        });

        // this.microjob.controls["category"].patchValue(this.dataEdit.category, {
        //   onlySelf: true
        // });
      }
    });
  }
}
