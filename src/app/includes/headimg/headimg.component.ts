import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-headimg",
  templateUrl: "./headimg.component.html",
  styleUrls: ["./headimg.component.css"]
})
export class HeadimgComponent implements OnInit {
  sub: any;
  cat: string;
  @Input() tag: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    if (typeof this.tag === undefined) {
      this.sub = this.route.queryParams.subscribe(params => {
        this.cat = params["name"]; // (+) converts string 'id' to a number

        // In a real app: dispatch action to load the details here.
      });
    } else {
      this.cat = this.tag;
    }

    console.log(this.cat);
  }
}
