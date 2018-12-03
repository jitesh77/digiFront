import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user/user.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-hourlies",
  templateUrl: "./hourlies.component.html",
  styleUrls: ["./hourlies.component.css"]
})
export class HourliesComponent implements OnInit {
  hourliesData: any;
  sub: any;
  page: any;
  message: string;
  list = true;
  name = "Hourlies";
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.page = params["page"];
      this.page = parseInt(this.page);
      if (this.page < 1) {
        this.page = 1;
      }
    });
  }

  ngOnInit() {
    this.getHourlies(this.page);
  }

  receivePage($event) {
    this.page = $event;
    if (this.page < 1) {
      this.page = 1;
    }
    this.router.navigateByUrl("/hourlies/" + this.page);
    this.getHourlies(this.page);
  }
  getHourlies(page) {
    this.userService.getHourlies(page, 28).subscribe(res => {
      if (res.result) {
        this.hourliesData = res.data;
        this.message = "";
      } else {
        this.hourliesData = [];
        this.message = res.message;
      }
    });
  }
}
