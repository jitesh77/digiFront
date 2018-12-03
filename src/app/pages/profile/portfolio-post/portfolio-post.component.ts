import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Portfolio } from "../../../shared/models/portfolio.model";
import { ApiService } from "../../../services/api/api.service";
import { UserService } from "../../../services/user/user.service";
import { AlertService } from "../../../services/url/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HomeService } from "../../../services/home/home.service";

@Component({
  selector: "app-portfolio-post",
  templateUrl: "./portfolio-post.component.html",
  styleUrls: ["./portfolio-post.component.css"]
})
export class PortfolioPostComponent implements OnInit {
  portfolio: FormGroup;
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
    private homeService: HomeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getTags();
    this.portfolio = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(4)]],
      description: ["", [Validators.required, Validators.minLength(5)]],
      links: ["", []],
      tags: ["", [Validators.required]],
      date: ["", []],
      category: ["", [Validators.required]],
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

  onSubmit({ value, valid }: { value: Portfolio; valid: boolean }) {
    value["brDescription"] = value.description.replace(/\r?\n/g, "<br />");
    if (this.id != undefined) {
      value["id"] = this.id;

      this.userService.updatePortfolio(value).subscribe(res => {
        if (res.result) {
          console.log(res.message);
        }
      });
    } else {
      this.userService.postPortfolio(value).subscribe(
        res => {
          if (res.result) {
            this.alertService.success(res.message, false);
            this.router.navigateByUrl("/dashboard");
          } else {
            this.alertService.error(res.message, false);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  onChanges(): void {
    this.portfolio.get("category").valueChanges.subscribe(val => {
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
              this.portfolio.patchValue({
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
    this.homeService.getSinglePortfolio(id).subscribe(res => {
      if (res.result) {
        // console.log(res.data);
        this.dataEdit = res.data;
        this.portfolio.patchValue({
          title: this.dataEdit.title,
          description: this.dataEdit.description,
          links: this.dataEdit.links,
          tags: this.dataEdit.tags,
          date: this.dataEdit.date,
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
