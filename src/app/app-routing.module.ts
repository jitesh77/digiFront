import { NgModule, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
// pages import
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { PostComponent } from "./pages/post/post.component";
import { CategoryComponent } from "./pages/category/category.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { DashboardComponent } from "./pages/profile/dashboard/dashboard.component";
import { BuyerReqComponent } from "./pages/buyer-req/buyer-req.component";
import { RequestPageComponent } from "./pages/request-page/request-page.component";
import { HourliesComponent } from "./pages/hourlies/hourlies.component";
import { MicroserviceComponent } from "./pages/microservice/microservice.component";
import { HourliesPageComponent } from "./pages/hourlies-page/hourlies-page.component";

// dashboard children
import { JobPostComponent } from "./pages/profile/job-post/job-post.component";
import { RequestPostComponent } from "./pages/profile/request-post/request-post.component";
import { UpdateProfileComponent } from "./pages/profile/update-profile/update-profile.component";
import { DashHomeComponent } from "./pages/profile/dash-home/dash-home.component";
import { MessagesComponent } from "./pages/profile/messages/messages.component";
import { HourlyPostComponent } from "./pages/profile/hourly-post/hourly-post.component";
import { PortfolioPostComponent } from "./pages/profile/portfolio-post/portfolio-post.component";
import { MyMicrojobComponent } from "./pages/profile/my-microjob/my-microjob.component";
import { MyHourliesComponent } from "./pages/profile/my-hourlies/my-hourlies.component";
import { MyBuyerrequestsComponent } from "./pages/profile/my-buyerrequests/my-buyerrequests.component";
import { OrdersComponent } from "./pages/profile/orders/orders.component";
import { MessageDetailsComponent } from "./pages/profile/message-details/message-details.component";
// signup children
import { AddDetailsComponent } from "./pages/signup/add-details/add-details.component";
import { VerifyComponent } from "./pages/signup/verify/verify.component";

import { ForgotComponent } from "./pages/login/forgot/forgot.component";
import { ResetComponent } from "./pages/login/reset/reset.component";

// guards
import { AuthGuard } from "./services/auth/auth.guard";
import { SignedinGuard } from "./services/auth/signedin.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent, canActivate: [SignedinGuard] },
  { path: "forgot", component: ForgotComponent },
  { path: "reset/:email/:token", component: ResetComponent },
  { path: "profile/:id", component: ProfileComponent },
  { path: "signup", component: SignupComponent, canActivate: [SignedinGuard] },
  { path: "signup/verify", component: VerifyComponent },
  {
    path: "signup/details",
    component: AddDetailsComponent,
    canActivate: [AuthGuard],
    pathMatch: "full"
  },
  {
    path: "category",
    component: CategoryComponent
  },
  { path: "microjob/:id", component: PostComponent },
  { path: "test", component: AddDetailsComponent },
  { path: "buyer_requests/:page", component: BuyerReqComponent },
  { path: "buyers_req/:id", component: RequestPageComponent },
  { path: "hourlies/:page", component: HourliesComponent },
  { path: "hourly/:id", component: HourliesPageComponent },
  { path: "microjobs/:page", component: MicroserviceComponent },
  {
    path: "messages/room/:id/:userId",
    component: MessageDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: DashHomeComponent,
        pathMatch: "full",
        canActivateChild: [AuthGuard]
      },
      {
        path: "job_post",
        component: JobPostComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: "req_post",
        component: RequestPostComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: "hourly_post",
        component: HourlyPostComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: "update",
        component: UpdateProfileComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: "messages",
        component: MessagesComponent,
        canActivate: [AuthGuard]
      },

      {
        path: "myMicrojobs",
        component: MyMicrojobComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "myHourlies",
        component: MyHourliesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "myBuyerRequests",
        component: MyBuyerrequestsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "portfolio_post",
        component: PortfolioPostComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "edit/portfolio_post/:id",
        component: PortfolioPostComponent,
        canActivate: [AuthGuard]
      },

      {
        path: "edit/job_post/:id",
        component: JobPostComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "edit/req_post/:id",
        component: RequestPostComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: "edit/hourly_post/:id",
        component: HourlyPostComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: "order/:type/:id",
        component: OrdersComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" }),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
