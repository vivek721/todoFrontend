import { Component, Output, EventEmitter } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";
import { AppService } from "src/app/app.service";
import { TodoService } from "src/app/todo.service";
import { Router } from "@angular/router";
declare const $: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent {
  @Output() UserName = new EventEmitter<String>();

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

  constructor(
    private toastr: ToastrService,
    private Cookie: CookieService,
    private AppService: AppService,
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authToken = this.Cookie.get("authtoken");
    this.userInfo = this.AppService.getUserInfoFromLocalstorage();
    this.userId = this.Cookie.get("userId");
    this.userName = this.Cookie.get("userName");
    this.getAllTodoForUser();
  }

  onAddTask() {
    let data = {
      title: this.itemTitle,
      status: false,
      createdBy: this.userId
    };
    this.todoService.createTodo(data, this.authToken).subscribe(
      response => {
        this.toastr.success("new Todo Added");
        this.getAllTodoForUser();
      },
      error => {
        this.toastr.error("Error while creating todo " + error);
      }
    );
  }

  getAllTodoForUser() {
    this.todoService.getTodoById(this.userId, this.authToken).subscribe(
      response => {
        console.log("get all worked");
        this.todos = response["data"];
      },
      error => {
        this.toastr.error("Error while getting todo " + error);
      }
    );
  }

  deleteTodo(todoId) {
    console.log("deleted " + todoId);
    this.todoService.deleteTodoById(todoId, this.authToken).subscribe(
      response => {
        this.toastr.success("new Todo Added");
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
    console.log(todo);
  }
  toggleTodoComplete1(status) {
    if (status === "false") {
      this.selectedItemStatus = false;
    }
    console.log(this.selectedItemStatus);
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
    console.log(this.subTasks);
  }
  checkBoxClicked(index) {
    for (let i = 0; i < this.subTasks.length; i++) {
      if (i == index) {
        this.subTasks[i].subStatus = !this.subTasks[i].subStatus;
      }
    }
    console.log(this.subTasks);
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
    console.log(this.subTasks);
  }

  submitChange() {
    console.log(this.subTasks);
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
