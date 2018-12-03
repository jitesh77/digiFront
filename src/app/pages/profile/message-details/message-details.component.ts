import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user/user.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-message-details",
  templateUrl: "./message-details.component.html",
  styleUrls: ["./message-details.component.css"]
})
export class MessageDetailsComponent implements OnInit {
  messageData: Array<any> = [];
  userId: any;
  userData: any;
  room: any;
  currentUser: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  messageBox: string;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params["userId"];
      this.room = params["id"];
      console.log(this.userId);
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log(this.currentUser);
      this.getUserDetails(this.userId);
      this.getMessages(this.room);
    });
  }
  addMessage() {
    let value = {
      to: this.userId,
      body: this.messageBox
    };
    // console.log(this.messageBox);
    this.messageData.push(value);
    this.messageBox = "";
    // console.log(this.messageData);
    this.addMessageData(value);
  }

  getUserDetails(id) {
    this.userService.getSmallUserDetails(this.userId).subscribe(res => {
      if (res.result) {
        this.userData = res.data;
      }
    });
  }

  getMessages(room) {
    this.userService.getMessages(room).subscribe(
      res => {
        if (res.result) {
          this.messageData = res.data.messages;
        } else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  addMessageData(value) {
    this.userService
      .addMessage(value, this.room, this.userData)
      .subscribe(res => {
        // console.log(res);
      });
  }
}
