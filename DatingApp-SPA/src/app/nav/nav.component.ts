import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// Services
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};
  uniqueName: string;
  // Navbar
  isCollapsed = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.uniqueName = this.authService.getUniqueName();
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success("Logged in successfully");
        this.router.navigate(["/members"]);
      },
      err => {
        this.alertify.error(err);
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  logout() {
    localStorage.removeItem("token");
    this.alertify.message("logged out");
    this.router.navigate(["/home"]);
  }
}
