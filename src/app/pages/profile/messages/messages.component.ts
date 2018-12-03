import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user/user.service";
import { User } from "../../../shared/models/user.model";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"]
})
export class MessagesComponent implements OnInit {
  messageListData: any;
  currentUser: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userService.getMessageList().subscribe(res => {
      if (res.result) {
        this.messageListData = res.data;
        console.log(this.messageListData);
      }
    });
  }
}
