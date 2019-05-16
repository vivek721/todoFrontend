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

@NgModule({
  declarations: [DashboardComponent, TodoComponent, FriendComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
    SidebarModule,
    ButtonModule,
    TooltipModule,
    AccordionModule,
    FormsModule,
    CardModule,
    RouterModule.forChild([
      {
        path: "todo/dashboard",
        component: DashboardComponent
      },
      { path: "", redirectTo: "todo/dashboard", pathMatch: "full" },
      { path: "todo/friends", component: FriendComponent }
    ])
  ],
  bootstrap: [TodoComponent]
})
export class TodoModule {}
