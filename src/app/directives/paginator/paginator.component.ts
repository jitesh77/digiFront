import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.css"]
})
export class PaginatorComponent implements OnInit {
  @Output() pageEvent = new EventEmitter<number>();
  constructor(private route: ActivatedRoute) {}
  sub: any;
  page: any;
  disable = true;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.page = params["page"];
      this.page = parseInt(this.page);
    });
    // console.log("cccc" + this.page);
  }

  next() {
    this.page++;
    this.pageEvent.emit(this.page);
  }

  previous() {
    this.page--;
    if (this.page < 1) {
      this.page = 1;
    }
    this.pageEvent.emit(this.page);
  }
}
