import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user/user.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../../services/api/api.service";
import { UpdateProfile } from "../../../shared/models/signup.model";
import { AlertService } from "../../../services/url/alert.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-update-profile",
  templateUrl: "./update-profile.component.html",
  styleUrls: ["./update-profile.component.css"]
})
export class UpdateProfileComponent implements OnInit {
  form: FormGroup;
  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
    private _fms: FlashMessagesService
  ) {}
  user: object;
  updateProfile: FormGroup;
  data: any;
  skillsData: object;
  imageUrl: string;
  selectedFile: any;
  selectdFileType: any;
  selectedFileName: string = "";
  uploadMessage: string = "";
  key: any;
  ngOnInit() {
    this.updateProfile = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      tagline: [""],
      description: [""],
      gender: ["", [Validators.required]],
      skills: ["", []],
      country: ["", [Validators.required]],
      hourlyRate: ["", []],
      profilePicture: [null, []]
    });
    this.getSkills();
    this.getCurrentUserData();
  }

  getCurrentUserData() {
    this.userService.currentUser().subscribe(res => {
      if (res.result) {
        this.user = res.data;
        console.log(this.user);
        this.updateProfile.patchValue({
          firstname: res.data.fname,
          lastname: res.data.lname,
          tagline: res.data.tagline,
          description: res.data.description,
          gender: res.data.profile.gender,
          skills: res.data.skills,
          country: res.data.profile.country,
          hourlyRate: res.data.hourlyRate || 0,
          profilePicture: res.data.profilePicture
        });
        this.imageUrl = res.data.profilePicture;
        console.log(this.imageUrl);
      } else {
        this.router.navigateByUrl("/dashboard");
      }
    });
  }

  getSkills() {
    this.apiService.getAllSubCategories().subscribe(
      res => {
        if (res.result) {
          this.skillsData = res.data;
          console.log(this.skillsData);
        } else {
          console.log(res.message);
        }
      },
      err => console.log(err)
    );
  }

  //

  onSubmit({ value, valid }: { value: UpdateProfile; valid: boolean }) {
    // console.log(value);
    this.userService.postUpdateDetails(value).subscribe(
      res => {
        if (res.result) {
          this._fms.show("Profile data successfully updated", {
            cssClass: "alert-success",
            timeout: 2000
          });
          this.router.navigateByUrl("/dashboard");
        } else {
          this._fms.show("Error in updating profile, Please try again", {
            cssClass: "alert-danger",
            timeout: 2000
          });
        }
      },
      err => {
        this._fms.show("Error in updating profile, Please try again", {
          cssClass: "alert-danger",
          timeout: 2000
        });
      }
    );
  }

  fileUpload() {
    document.getElementById("file").click();
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
              this.updateProfile.patchValue({
                profilePicture: this.imageUrl
              });
              console.log(this.imageUrl);
            }
          });
      }
    });
  }
}
