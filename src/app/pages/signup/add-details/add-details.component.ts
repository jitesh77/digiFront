import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { AddDetails } from "../../../shared/models/signup.model";
import { UserService } from "../../../services/user/user.service";
import { AlertService } from "../../../services/url/alert.service";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "app-add-details",
  templateUrl: "./add-details.component.html",
  styleUrls: ["./add-details.component.css"]
})
export class AddDetailsComponent implements OnInit {
  profilePicture =
    "https://s3.us-east-2.amazonaws.com/digiimgbucket/uploads/placeholder/placeholder.jpg";
  addDetails: FormGroup;
  usernameMessage: string;
  username = true;
  selectedFile: any;
  selectdFileType: any;
  selectedFileName: string = "";
  imageUrl: string;
  uploadMessage: string = "";
  key: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.addDetails = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      country: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      description: [""],
      profilePicture: [null, []],
      tagline: [""]
    });

    this.onChanges();
  }
  fileUpload() {
    document.getElementById("file").click();
  }

  changeListner(event) {
    console.log(event.target.files[0]);
  }

  onSubmit({ value, valid }: { value: AddDetails; valid: boolean }) {
    console.log(value);
    let id: string;
    this.userService.currentUser().subscribe(
      res => {
        if (res.result) {
          id = res.data._id;
          value.id = id;
          this.userService.postDetails(value).subscribe(
            res => {
              this.userService.currentUser().subscribe(res => {
                if (res) {
                  this.authService.addDataToStorage(res.data);
                  this.router.navigateByUrl("/dashboard");
                }
              });
            },
            err => {
              this.alertService.error(err, false);
            }
          );
        } else {
          this.alertService.error(res.message, false);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  onChanges(): void {
    this.addDetails.get("username").valueChanges.subscribe(val => {
      console.log(val);
      if (val.length >= 3) {
        setTimeout(() => {
          this.userService.findUsername(val).subscribe(
            res => {
              if (res.result) {
                this.usernameMessage = res.message;
                this.username = true;
              } else {
                this.usernameMessage = res.message;
                this.username = false;
              }
            },
            err => {
              console.log(err);
            }
          );
        }, 300);
      }
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
              this.profilePicture = this.imageUrl;
              this.addDetails.patchValue({
                profilePicture: this.imageUrl
              });
              console.log(this.imageUrl);
            }
          });
      }
    });
  }
}
