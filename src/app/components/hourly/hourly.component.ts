import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-hourly",
  templateUrl: "./hourly.component.html",
  styleUrls: ["./hourly.component.css"]
})
export class HourlyComponent implements OnInit {
  @Input() hourliesData: any;
  @Input() message: any;
  @Input() list: any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    // this.getHourlies();
  }

  // getHourlies() {
  //   this.userService.getHourlies(1, 8).subscribe(res => {
  //     if (res.result) {
  //       this.hourliesData = res.data;
  //     } else {
  //       console.log(res.message);
  //     }
  //   });
  // }
}
