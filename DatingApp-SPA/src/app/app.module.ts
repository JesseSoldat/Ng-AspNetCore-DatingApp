import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
// 3rd Party
import { JwtModule } from "@auth0/angular-jwt";
import { BsDropdownModule } from "ngx-bootstrap";
import { CollapseModule } from "ngx-bootstrap";
// Services
import { AuthService } from "./_services/auth.service";
import { AlertifyService } from "./_services/alertify.service";
import { ErrorInterceptorProvider } from "./_services/error.interceptor";
import { LocalStorageService } from "./_services/local-storage.service";
import { AuthGuard } from "./_guards/auth.guard";
import { appRoutes } from "./routes";
// Components
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { UserService } from "./_services/user.service";

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
    MessagesComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
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
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
