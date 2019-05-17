import { AppService } from "../../app.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";
import { TodoService } from "src/app/todo.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FriendService } from "src/app/friend.service";

@Component({
  selector: "app-friends-dashboard",
  templateUrl: "./friends-dashboard.component.html",
  styleUrls: ["./friends-dashboard.component.css"]
})
export class FriendsDashboardComponent implements OnInit {
  public authToken;
  public userInfo;
  public userId;
  public newTodo;
  public allTodos;
  public todos = [];
  public itemTitle;
  public itemComplete = false;
  public visibleSidebar2 = false;
  public subTasks = [];
  public subTaskTitle;
  public selectedIndex;
  selectedTodoId: any;
  selectedItemTitle: any;
  selectedItemStatus: any;
  selectedItemCreatedBy: any;
  userName: string;
  userData: any;

  constructor(
    private toastr: ToastrService,
    private Cookie: CookieService,
    private AppService: AppService,
    private todoService: TodoService,
    private friendService: FriendService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authToken = this.Cookie.get("authtoken");
    this.userId = this.route.snapshot.paramMap.get("userId");
    this.getUserDetails();
    this.getAllTodoForUser();
  }

  getUserDetails() {
    this.friendService.getUserDetails(this.userId, this.authToken).subscribe(
      response => {
        this.userData = response["data"];
      },
      error => {
        this.toastr.error("Error while creating todo " + error);
      }
    );
  }

  getAllTodoForUser() {
    this.todoService.getTodoById(this.userId, this.authToken).subscribe(
      response => {
        this.todos = response["data"];
      },
      error => {
        this.toastr.error("Error while getting todo " + error);
      }
    );
  }

  deleteTodo(todoId) {
    this.todoService.deleteTodoById(todoId, this.authToken).subscribe(
      response => {
        this.toastr.success("Todo deleted");
        this.getAllTodoForUser();
      },
      error => {
        this.toastr.error("Error while creating todo " + error);
      }
    );

    this.toastr.success("successfully deleted the item");
  }

  toggleTodoComplete(todo, index) {
    if (todo.status === true) {
      todo.status = false;
      this.toastr.show("Task moved to Todo List");
    } else {
      todo.status = true;
      this.toastr.show("Task moved to completed List");
    }
    this.selectedItemTitle = todo.title;
    this.selectedItemStatus = todo.status;
    this.selectedTodoId = todo.todoId;
    this.selectedIndex = index;
    this.selectedItemCreatedBy = todo.createdBy;
    todo.subtasks.forEach(subtask => {
      this.subTasks.push(subtask);
    });

    this.submitChange();
  }
  toggleTodoComplete1(status) {
    if (status === "false") {
      this.selectedItemStatus = false;
    }
  }

  setSelectedItem(todo, index) {
    this.subTasks = [];
    this.visibleSidebar2 = true;
    this.selectedItemTitle = todo.title;
    this.selectedItemStatus = todo.status;
    this.selectedTodoId = todo.todoId;
    this.selectedIndex = index;
    this.selectedItemCreatedBy = todo.createdBy;
    todo.subtasks.forEach(subtask => {
      this.subTasks.push(subtask);
    });
  }
  checkBoxClicked(index) {
    for (let i = 0; i < this.subTasks.length; i++) {
      if (i == index) {
        this.subTasks[i].subStatus = !this.subTasks[i].subStatus;
      }
    }
  }

  addSubTasks() {
    let x = {
      subTitle: this.subTaskTitle,
      subStatus: false
    };
    if (x.subTitle === "" || x.subTitle === null || x.subTitle === undefined) {
      this.toastr.error("Please enter subtasks");
    } else {
      this.subTasks.push(x);
      this.subTaskTitle = "";
    }
  }

  deleteSubTask(i) {
    this.subTasks.splice(i, 1);
  }

  submitChange() {
    let data = {
      title: this.selectedItemTitle,
      status: this.selectedItemStatus,
      subtasks: this.subTasks,
      createdBy: this.selectedItemCreatedBy
    };
    this.todoService
      .editTodoById(data, this.authToken, this.selectedTodoId)
      .subscribe(
        response => {
          this.toastr.success("Todo Updated Successfully");
          this.getAllTodoForUser();
        },
        error => {
          this.toastr.error("Error while editing todo " + error);
        }
      );
  }
}
