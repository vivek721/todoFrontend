import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FriendService {
  baseURL = "http://localhost:3000/api/v1/users";

  constructor(private http: HttpClient) {}

  getUserDetails(userId, authToken) {
    return this.http.get(
      `${this.baseURL}/${userId}/getUserById?authToken=${authToken}`
    );
  }

  getAllUserList(userId, authToken) {
    return this.http.get(
      `${this.baseURL}/${userId}/getAll?authToken=${authToken}`
    );
  }

  public sendFriendRequest(data, authToken): Observable<any> {
    const params = new HttpParams()
      .set("requestorId", data.requestorId)
      .set("requestorName", data.requestorName)
      .set("requestedId", data.requestedId)
      .set("requestedName", data.requestedName);

    return this.http.put(
      `${this.baseURL}/sendFriendRequest?authToken=${authToken}`,
      params
    );
  }

  public acceptFriendRequest(data, authToken): Observable<any> {
    const params = new HttpParams()
      .set("requestorId", data.requestorId)
      .set("requestorName", data.requestorName)
      .set("requestedId", data.requestedId)
      .set("requestedName", data.requestedName);

    return this.http.put(
      `${this.baseURL}/acceptFriendRequest?authToken=${authToken}`,
      params
    );
  }

  public rejectFriendRequest(data, authToken): Observable<any> {
    const params = new HttpParams()
      .set("requestorId", data.requestorId)
      .set("requestorName", data.requestorName)
      .set("requestedId", data.requestedId)
      .set("requestedName", data.requestedName);
    return this.http.put(
      `${this.baseURL}/rejectFriendRequest?authToken=${authToken}`,
      params
    );
  }
}
