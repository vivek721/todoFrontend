import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./user/signin/signin.component";
import { TodoComponent } from "./todo/todo.component";

const routes: Routes = [
  { path: "login", component: SigninComponent, pathMatch: "full" },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "todo", component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
