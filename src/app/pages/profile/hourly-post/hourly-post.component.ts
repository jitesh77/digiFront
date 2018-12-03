import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Hourlyjob } from "../../../shared/models/hourly.model";
import { ApiService } from "../../../services/api/api.service";
import { UserService } from "../../../services/user/user.service";
import { HomeService } from "../../../services/home/home.service";
import { AlertService } from "../../../services/url/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-hourly-post",
  templateUrl: "./hourly-post.component.html",
  styleUrls: ["./hourly-post.component.css"]
})
export class HourlyPostComponent implements OnInit {
  hourlyjob: FormGroup;
  categoryList: any;
  allTagList: any;
  subCategoryList: any;
  selectedFile: any;
  selectdFileType: any;
  selectedFileName: string = "No File Selected";
  imageUrl: any;
  uploadMessage: string = "";
  key: any;
  id: any;
  dataEdit: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private homeService: HomeService,
    private _fms: FlashMessagesService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getTags();
    this.hourlyjob = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(4)]],
      description: ["", [Validators.required, Validators.minLength(5)]],
      rate: ["", Validators.required],
      tags: ["", Validators.required],
      duration: ["", Validators.required],
      category: ["", Validators.required],
      images: ["", []],
      subCategory: ["", [Validators.required]],
      file: [null, [Validators.required]]
    });
    this.onChanges();

    this.route.params.subscribe(params => {
      this.id = params["id"];
      if (this.id != undefined) {
        this.selectedFileName = "";
        this.getHourly(this.id);
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
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit({ value, valid }: { value: Hourlyjob; valid: boolean }) {
    value["brDescription"] = value.description.replace(/\r?\n/g, "<br />");
    if (this.id != undefined) {
      value["id"] = this.id;
      console.log(value);
      this.userService.updateHourly(value).subscribe(res => {
        if (res.result) {
          this._fms.show(res.message, {
            cssClass: "alert-success",
            timeout: 2000
          });
          this.router.navigateByUrl("/dashboard/myHourlies");
        }
      });
    } else {
      this.userService.postHourly(value).subscribe(
        res => {
          if (res.result) {
            this._fms.show(res.message, {
              cssClass: "alert-success",
              timeout: 2000
            });
            this.router.navigateByUrl("/dashboard/myHourlies");
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
    this.hourlyjob.get("category").valueChanges.subscribe(val => {
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

  onFileChange(event) {
    this.selectedFile = event.target.files[0];
    this.selectdFileType = event.target.files[0].type;
    this.selectedFileName = event.target.files[0].name;
    console.log(this.selectedFileName);
  }
  upload() {
    this.userService.getSignedUrl(this.selectedFileName).subscribe(res => {
      this.uploadMessage = "Uploading file please wait...";
      if (res.result) {
        let signedUrl = res.data;
        this.key = res.key;
        console.log(this.key);
        this.userService
          .uploadfileAWSS3(signedUrl, this.selectdFileType, this.selectedFile)
          .subscribe(res => {
            if (res.headers !== undefined) {
              this.uploadMessage = "File uploaded";
              this.imageUrl = `https://digiimgbucket.s3.us-east-2.amazonaws.com/${
                this.key
              }`;
              this.hourlyjob.patchValue({
                file: this.imageUrl
              });
              console.log(this.imageUrl);
            }
          });
      }
    });
  }

  // fileUpload() {
  //   document.getElementById("file").click();
  // }
  selectFileInput() {
    document.getElementById("fileIn").click();
  }

  getHourly(id) {
    this.homeService.getSingleHourly(id).subscribe(res => {
      if (res.result) {
        this.dataEdit = res.data;
        this.hourlyjob.patchValue({
          title: this.dataEdit.title,
          description: this.dataEdit.description,
          rate: this.dataEdit.rate,
          tags: this.dataEdit.tags,
          duration: this.dataEdit.duration,
          category: this.dataEdit.category,
          subCategory: this.dataEdit.subCategory,
          file: this.dataEdit.file
        });
        this.imageUrl = res.data.file;
        // this.microjob.controls["category"].patchValue(this.dataEdit.category, {
        //   onlySelf: true
        // });
      }
    });
  }
}
