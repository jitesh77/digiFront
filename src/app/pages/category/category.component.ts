import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { HomeService } from "../../services/home/home.service";
import { ApiService } from "../../services/api/api.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  id: string;
  name: string;
  subName: string;
  microjobData: any;
  hourlyData: any;
  buyerRequestData: any;
  message: string = "";
  navigationSubscription;
  subCategoriesData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.id = params["id"];
      this.name = params["name"];
      this.subName = params["subName"];
      console.log(this.id, this.name);
      // this.router.navigate(["/category"], {
      //   queryParams: { name: this.name, id: this.id }
      // });
      // this.name =
      if (this.subName != undefined) {
        this.subPost(this.id);
        this.getSubCategory(this.id);
      } else {
        this.getCategoryPost(this.id);
        this.getSubCategory(this.id);
      }
    });
  }

  getCategoryPost(id) {
    this.homeService.getCategoryPost("BuyerRequest", id).subscribe(
      res => {
        if (res.result) {
          this.buyerRequestData = res.data;
          this.message = "";
        } else {
          this.buyerRequestData = undefined;
        }
      },
      err => {
        console.log(err);
      }
    );
    this.homeService.getCategoryPost("Hourly", id).subscribe(
      res => {
        if (res.result) {
          console.log(res.data);
          this.hourlyData = res.data;
          this.message = "";
        } else {
          this.hourlyData = undefined;
        }
      },
      err => {
        console.log(err);
      }
    );
    this.homeService.getCategoryPost("Microjob", id).subscribe(
      res => {
        if (res.result) {
          this.microjobData = res.data;
          this.message = "";
        } else {
          this.microjobData = undefined;
        }
      },
      err => {
        console.log(err);
      }
    );
    if (
      this.hourlyData == undefined &&
      this.microjobData == undefined &&
      this.buyerRequestData == undefined
    ) {
      this.message = "No posts for this category yet";
    }
  }

  getSubCategory(id) {
    this.apiService.getSubCategory(id).subscribe(
      res => {
        if (res.result) {
          this.subCategoriesData = res.data;
          console.log(res.data);
        } else {
          this.subCategoriesData = undefined;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  subPostNavigate(subName) {
    this.router.navigate(["/category"], {
      queryParams: { name: this.name, subName: subName, id: this.id }
    });
  }

  subPost(idSub) {
    this.homeService.getSubCategoryPost("BuyerRequest", idSub).subscribe(
      res => {
        if (res.result) {
          this.buyerRequestData = res.data;
          this.message = "";
        } else {
          this.buyerRequestData = undefined;
        }
      },
      err => {
        console.log(err);
      }
    );
    this.homeService.getSubCategoryPost("Hourly", idSub).subscribe(
      res => {
        if (res.result) {
          this.hourlyData = res.data;
          this.message = "";
        } else {
          this.hourlyData = undefined;
        }
      },
      err => {
        console.log(err);
      }
    );
    this.homeService.getSubCategoryPost("Microjob", idSub).subscribe(
      res => {
        if (res.result) {
          this.microjobData = res.data;
          this.message = "";
        } else {
          this.microjobData = undefined;
        }
      },
      err => {
        console.log(err);
      }
    );
    if (
      this.hourlyData == undefined &&
      this.microjobData == undefined &&
      this.buyerRequestData == undefined
    ) {
      this.message = "No posts for this category yet";
    }
  }
}
