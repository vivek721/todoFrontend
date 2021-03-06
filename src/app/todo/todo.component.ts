import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AppService } from "../app.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  public authToken: string;
  userInfo: any;
  userId: string;
  userName: string;

  constructor(
    private router: Router,
    private Cookie: CookieService,
    private AppService: AppService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.authToken = this.Cookie.get("authtoken");
    this.userInfo = this.AppService.getUserInfoFromLocalstorage();
    this.userId = this.Cookie.get("userId");
    this.userName = this.Cookie.get("userName");
  }

  public logout: any = () => {
    this.AppService.logout().subscribe(
      apiResponse => {
        if (apiResponse.status === 200) {
          console.log("logout called");
          this.Cookie.delete("authtoken");

          this.Cookie.delete("receiverId");

          this.Cookie.delete("receiverName");

          /*    this.SocketService.exitSocket(); */

          this.router.navigate(["/"]);
        } else {
          this.toastr.error(apiResponse.message);
        } // end condition
      },
      err => {
        this.toastr.error("some error occured");
      }
    );
  }; // end logout
}
