import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user/user.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-microservice",
  templateUrl: "./microservice.component.html",
  styleUrls: ["./microservice.component.css"]
})
export class MicroserviceComponent implements OnInit {
  microjobsData: any;
  sub: any;
  page: any;
  message: string;
  list = true;
  name = "Microjobs";
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
    this.getMicrojobs(this.page);
  }

  receivePage($event) {
    this.page = $event;
    if (this.page < 1) {
      this.page = 1;
    }
    this.router.navigateByUrl("/microjobs/" + this.page);
    this.getMicrojobs(this.page);
  }

  getMicrojobs(page) {
    this.page = parseInt(this.page);
    this.userService.getMicrojobs(page, 16).subscribe(res => {
      if (res.result) {
        this.microjobsData = res.data;
        this.message = "";
        // console.log(this.microjobsData);
      } else {
        this.microjobsData = [];
        this.message = res.message;
      }
    });
  }
}
