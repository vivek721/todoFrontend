import { Injectable } from "@angular/core";
import { todo } from "./todo/todo";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  baseURL = "http://localhost:3000/api/v1/todo";
  constructor(private http: HttpClient) {}

  createTodo(data, authToken): Observable<any> {
    const params = new HttpParams()
      .set("title", data.title)
      .set("status", data.status)
      .set("createdBy", data.createdBy);

    console.log(params);
    return this.http.post(
      `${this.baseURL}/create?authToken=${authToken}`,
      params
    );
  }

  getTodoById(userId, authToken): Observable<any> {
    return this.http.get(
      `${this.baseURL}/${userId}/get?authToken=${authToken}`
    );
  }

  editTodoById(data, authToken, todoId) {
    return this.http.put(
      `${this.baseURL}/${todoId}/edit?authToken=${authToken}`,
      data
    );
  }

  deleteTodoById(todoId, authToken) {
    return this.http.post(
      `${this.baseURL}/${todoId}/delete?authToken=${authToken}`,
      todoId
    );
  }
}
