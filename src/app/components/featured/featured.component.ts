import { Component, OnInit } from "@angular/core";
import { Featured } from "../../shared/models/featured.model";
import { HomeService } from "../../services/home/home.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-featured",
  templateUrl: "./featured.component.html",
  styleUrls: ["./featured.component.css"]
})
export class FeaturedComponent implements OnInit {
  featured: Featured;
  constructor(private homeService: HomeService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      // put the code from `ngOnInit` here
    });
  }

  ngOnInit() {}
}
