import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";
// models
import { User } from "../../_models/user";
// services
import { UserService } from "../../_services/user.service";
import { AlertifyService } from "../../_services/alertify.service";

@Component({
  selector: "app-member-details",
  templateUrl: "./member-details.component.html",
  styleUrls: ["./member-details.component.css"]
})
export class MemberDetailsComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => (this.user = data["user"]));
    console.log(this.user);
  }
}
