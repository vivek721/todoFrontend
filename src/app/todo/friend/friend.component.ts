import { Component, OnInit } from "@angular/core";
import { FriendService } from "src/app/friend.service";
import { CookieService } from "ngx-cookie-service";
import { AppService } from "src/app/app.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-friend",
  templateUrl: "./friend.component.html",
  styleUrls: ["./friend.component.css"]
})
export class FriendComponent implements OnInit {
  userData: any;
  allUsers = [];
  recievedRequests = [];
  friends = [];
  authToken: string;
  userInfo: any;
  userId: string;
  userName: string;
  sentRequests = [];

  constructor(
    private friendService: FriendService,
    private Cookie: CookieService,
    private AppService: AppService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.authToken = this.Cookie.get("authtoken");
    this.userInfo = this.AppService.getUserInfoFromLocalstorage();
    this.userId = this.Cookie.get("userId");
    this.userName = this.Cookie.get("userName");
    this.getUserDetails();
    this.getAllUser();
  }

  getAllUser() {
    this.friendService.getAllUserList(this.userId, this.authToken).subscribe(
      response => {
        for (let i in response) {
          this.allUsers.push(response[i]);
        }
        for (let i in this.allUsers) {
          for (let j in this.friends) {
            if (this.allUsers[i].userId === this.friends[j].friendId) {
              let k = parseInt(i);
              this.allUsers.splice(k, 1);
            }
          }
        }
        for (let i in this.allUsers) {
          for (let j in this.recievedRequests) {
            if (this.allUsers[i].userId === this.recievedRequests[j].userId) {
              let k = parseInt(i);
              this.allUsers.splice(k, 1);
            }
          }
        }
        for (let i in this.allUsers) {
          for (let j in this.sentRequests) {
            if (this.allUsers[i].userId === this.sentRequests[j].userId) {
              let k = parseInt(i);
              this.allUsers.splice(k, 1);
            }
          }
        }
      },
      error => {
        this.toastr.error("Error while creating todo " + error);
      }
    );
  }

  getUserDetails() {
    this.friendService.getUserDetails(this.userId, this.authToken).subscribe(
      response => {
        this.userData = response["data"];
        for (let i in this.userData.friendList) {
          this.friends.push(this.userData.friendList[i]);
        }
        for (let i in this.userData.requestRecieved) {
          this.recievedRequests.push(this.userData.requestRecieved[i]);
        }
        for (let i in this.userData.requestSent) {
          this.sentRequests.push(this.userData.requestSent[i]);
        }
      },
      error => {
        this.toastr.error("Error while creating todo " + error);
      }
    );
  }

  sendFriendRequest(recieverId, recieverName) {
    let data = {
      requestorId: this.userId,
      requestorName: this.userName,
      requestedId: recieverId,
      requestedName: recieverName
    };
    this.allUsers = [];
    this.friends = [];
    this.sentRequests = [];
    this.recievedRequests = [];
    this.friendService.sendFriendRequest(data, this.authToken).subscribe(
      response => {
        this.toastr.success("Friend Request Sent");
        this.getUserDetails();
        this.getAllUser();
      },
      error => {
        this.toastr.error("Error while Sending Friend Request " + error);
      }
    );
  }

  acceptFriendRequest(recieverId, recieverName) {
    let data = {
      requestorId: this.userId,
      requestorName: this.userName,
      requestedId: recieverId,
      requestedName: recieverName
    };
    this.allUsers = [];
    this.friends = [];
    this.sentRequests = [];
    this.recievedRequests = [];
    this.friendService.acceptFriendRequest(data, this.authToken).subscribe(
      response => {
        this.toastr.success("Friend Request accepted");
        this.getUserDetails();
        this.getAllUser();
      },
      error => {
        this.toastr.error("Error while accepting Friend Request " + error);
      }
    );
  }

  rejectFriendRequest(recieverId, recieverName) {
    let data = {
      requestorId: this.userId,
      requestorName: this.userName,
      requestedId: recieverId,
      requestedName: recieverName
    };
    console.log(data);
    this.allUsers = [];
    this.friends = [];
    this.sentRequests = [];
    this.recievedRequests = [];
    this.friendService.rejectFriendRequest(data, this.authToken).subscribe(
      response => {
        this.toastr.success("Friend Request rejected");
        this.getUserDetails();
        this.getAllUser();
      },
      error => {
        this.toastr.error("Error while rejecting Friend Request " + error);
      }
    );
  }
}
