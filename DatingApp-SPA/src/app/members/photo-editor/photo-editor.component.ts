import { Component, Input, OnInit } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { environment } from "../../../environments/environment";
// models
import { Photo } from "../../_models/photo";
// services
import { AuthService } from "../../_services/auth.service";
import { UserService } from "../../_services/user.service";
import { AlertifyService } from "../../_services/alertify.service";
import { LocalStorageService } from "src/app/_services/local-storage.service";

@Component({
  selector: "app-photo-editor",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.css"]
})
export class PhotoEditorComponent implements OnInit {
  @Input()
  photos: Photo[];
  baseUrl = environment.apiUrl;
  currentMain: Photo;
  // upload
  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: boolean): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    const path = "users/" + this.authService.decodedToken.nameid + "/photos";
    this.uploader = new FileUploader({
      url: this.baseUrl + path,
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userService
      .setMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          this.currentMain = this.photos.filter(p => p.isMain === true)[0];
          this.currentMain.isMain = false;
          photo.isMain = true;

          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;

          this.localStorageService.setItem(
            "user",
            JSON.stringify(this.authService.currentUser)
          );
        },
        err => this.alertify.error(err)
      );
  }
}
