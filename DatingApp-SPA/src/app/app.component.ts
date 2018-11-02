import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

// services
import { LocalStorageService } from "./_services/local-storage.service";
import { AuthService } from "./_services/auth.service";
// models
import { User } from "./_models/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    const token = this.localStorageService.getItem("token");
    const user: User = JSON.parse(this.localStorageService.getItem("user"));

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
}
