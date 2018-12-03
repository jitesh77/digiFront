import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Microjob } from "../../../shared/models/microjob.model";
import { ApiService } from "../../../services/api/api.service";
import { UserService } from "../../../services/user/user.service";
import { HomeService } from "../../../services/home/home.service";
import { AlertService } from "../../../services/url/alert.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EditService } from "../../../services/url/edit.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-job-post",
  templateUrl: "./job-post.component.html",
  styleUrls: ["./job-post.component.css"]
})
export class JobPostComponent implements OnInit {
  microjob: FormGroup;
  categoryList: any;
  allTagList: any;
  subCategoryList: any;
  selectedFile: any;
  selectdFileType: any;
  selectedFileName: string = "No File Selected";
  imageUrl: any;
  uploadMessage: string = "";
  key: any;
  id: string;
  dataEdit: any;
  default: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private userService: UserService,
    private homeService: HomeService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private editService: EditService,
    private _fms: FlashMessagesService
  ) {}

  ngOnInit() {
    this.microjob = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(4)]],
      description: ["", [Validators.required, Validators.minLength(5)]],
      price: ["", [Validators.required]],
      tags: ["", [Validators.required]],
      duration: ["", [Validators.required]],
      category: ["", [Validators.required]],
      // images: ["", [Validators.required]],
      subCategory: ["", [Validators.required]],
      file: [null, [Validators.required]]
    });
    this.getCategories();
    this.getTags();
    this.onChanges();
    this.route.params.subscribe(params => {
      this.id = params["id"];
      if (this.id != undefined) {
        this.selectedFileName = "";
        this.getMicrojob(this.id);
      }
    });

    // this.onFileChanges();
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

  onSubmit({ value, valid }: { value: Microjob; valid: boolean }) {
    value["brDescription"] = value.description.replace(/\r?\n/g, "<br />");
    if (this.id != undefined) {
      value["id"] = this.id;
      console.log(value);
      this.userService.updateMicrojob(value).subscribe(res => {
        if (res.result) {
          this._fms.show(res.message, {
            cssClass: "alert-success",
            timeout: 2000
          });
          this.router.navigateByUrl("/dashboard/myMicrojobs");
        }
      });
    } else {
      this.userService.postMicrojob(value).subscribe(
        res => {
          if (res.result) {
            this._fms.show(res.message, {
              cssClass: "alert-success",
              timeout: 2000
            });
            this.router.navigateByUrl("/dashboard/myMicrojobs");
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
    this.microjob.get("category").valueChanges.subscribe(val => {
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
              this.microjob.patchValue({
                file: this.imageUrl
              });
            }
          });
      }
    });
  }

  selectFileInput() {
    document.getElementById("fileIn").click();
  }

  getMicrojob(id) {
    this.homeService.getSingleMicrojob(id).subscribe(res => {
      if (res.result) {
        this.dataEdit = res.data;
        this.microjob.patchValue({
          title: this.dataEdit.title,
          description: this.dataEdit.description,
          price: this.dataEdit.price,
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
