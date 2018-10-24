import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
// 3rd Party
import { JwtModule } from "@auth0/angular-jwt";
import { BsDropdownModule, CollapseModule, TabsModule } from "ngx-bootstrap";
import { NgxGalleryModule } from "ngx-gallery";
// services
import { AuthService } from "./_services/auth.service";
import { UserService } from "./_services/user.service";
import { AlertifyService } from "./_services/alertify.service";
import { ErrorInterceptorProvider } from "./_services/error.interceptor";
import { LocalStorageService } from "./_services/local-storage.service";
// guards
import { AuthGuard } from "./_guards/auth.guard";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
// resolvers
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
import { MemberListResolver } from "./_resolvers/member-list.resolver";
import { MemberEditResolver } from "./_resolvers/member-edit.resolver";
import { appRoutes } from "./routes";
// components
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { MemberDetailsComponent } from "./members/member-details/member-details.component";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";

export function tokenGetter() {
  try {
    return localStorage.getItem("token");
  } catch (err) {
    console.log("localStorage is not available can not add token");
    return null;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberCardComponent,
    MemberDetailsComponent,
    MessagesComponent,
    ListsComponent,
    MemberEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/auth"]
      }
    })
  ],
  providers: [
    AuthService,
    UserService,
    AlertifyService,
    ErrorInterceptorProvider,
    LocalStorageService,
    AuthGuard,
    PreventUnsavedChanges,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
