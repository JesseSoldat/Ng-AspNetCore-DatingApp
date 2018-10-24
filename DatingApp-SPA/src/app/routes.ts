import { Routes } from "@angular/router";
// guards
import { AuthGuard } from "./_guards/auth.guard";
// component
import { HomeComponent } from "./home/home.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MemberDetailsComponent } from "./members/member-details/member-details.component";
import { MessagesComponent } from "./messages/messages.component";
import { ListsComponent } from "./lists/lists.component";
// resolvers
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "members",
        component: MemberListComponent
      },
      {
        path: "members/:id",
        component: MemberDetailsComponent,
        resolve: { user: MemberDetailResolver }
      },
      { path: "messages", component: MessagesComponent },
      { path: "lists", component: ListsComponent }
    ]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];
