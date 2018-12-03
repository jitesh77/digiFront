import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isLoggedin = false;
  constructor(private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.isLoggedin = JSON.parse(localStorage.getItem("loggedIn"));
      console.log(
        "called header" + JSON.parse(localStorage.getItem("loggedIn"))
      );
    });
  }

  ngOnInit() {}
}
