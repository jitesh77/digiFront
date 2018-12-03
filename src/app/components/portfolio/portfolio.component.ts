import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.css"]
})
export class PortfolioComponent implements OnInit {
  @Input() clickedPortfolio: any;
  constructor() {}

  ngOnInit() {}
}
