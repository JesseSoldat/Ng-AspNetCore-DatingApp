import { Component, OnInit } from "@angular/core";
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

  logout($event) {
    console.log("logout", $event);

    $event.preventDefault();
    localStorage.removeItem("token");
    this.alertify.message("logged out");
  }
}
