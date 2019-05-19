import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SidebarModule } from "primeng/sidebar";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { TodoComponent } from "./todo.component";
import { TooltipModule } from "primeng/tooltip";
import { FriendComponent } from "./friend/friend.component";
import { AccordionModule } from "primeng/accordion";
import { CardModule } from "primeng/card";
import { FriendsDashboardComponent } from "./friends-dashboard/friends-dashboard.component";
import { PaginatorModule } from "primeng/paginator";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    DashboardComponent,
    TodoComponent,
    FriendComponent,
    FriendsDashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    PaginatorModule,
    DialogModule,
    SidebarModule,
    ButtonModule,
    TooltipModule,
    AccordionModule,
    FormsModule,
    CardModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {
        path: "todo/dashboard",
        component: DashboardComponent
      },
      { path: "", redirectTo: "todo/dashboard", pathMatch: "full" },
      { path: "todo/friends", component: FriendComponent },
      { path: "todo/:userId", component: FriendsDashboardComponent }
    ])
  ],
  bootstrap: [TodoComponent]
})
export class TodoModule {}
