import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";

import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = "http://localhost:5000/api/auth/";
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.checkAuthToken();
  }

  checkAuthToken() {
    const token = this.localStorageService.getItem("token");
    this.decodedToken = this.jwtHelper.decodeToken(token);
    console.log("Decoded Auth Token:", this.decodedToken);
  }

  getUniqueName() {
    if (this.decodedToken) {
      return this.decodedToken.unique_name;
    }
    return "User";
  }

  login(model: any) {
    return this.http.post(this.baseUrl + "login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          this.localStorageService.setItem("token", user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + "register", model);
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    // token is NOT expired
    return !this.jwtHelper.isTokenExpired(token);
  }
}
