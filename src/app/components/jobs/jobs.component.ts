import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "../../services/user/user.service";
@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.css"]
})
export class JobsComponent implements OnInit {
  @Input() microjobsData: any;
  @Input() message: any;
  @Input() list: any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    // this.getMicrojobs();
  }

  // getMicrojobs() {
  //   this.userService.getMicrojobs(1, 16).subscribe(res => {
  //     if (res.result) {
  //       this.microjobsData = res.data;
  //       console.log(this.microjobsData);
  //     } else {
  //       console.log(res.message);
  //     }
  //   });
  // }
}
