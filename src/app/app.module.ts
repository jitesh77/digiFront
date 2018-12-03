import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { FeaturedComponent } from "./components/featured/featured.component";
import { JobsComponent } from "./components/jobs/jobs.component";
import { HeaderComponent } from "./components/header/header.component";
import { NavbarComponent } from "./includes/navbar/navbar.component";
import { HomeComponent } from "./pages/home/home.component";
import { RequestsComponent } from "./components/requests/requests.component";
import { AppRoutingModule } from ".//app-routing.module";
import { LoginComponent } from "./pages/login/login.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { FooterComponent } from "./includes/footer/footer.component";
import { PostComponent } from "./pages/post/post.component";
import { CategoryComponent } from "./pages/category/category.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { DashboardComponent } from "./pages/profile/dashboard/dashboard.component";

import { AddDetailsComponent } from "./pages/signup/add-details/add-details.component";
import { JobPostComponent } from "./pages/profile/job-post/job-post.component";
import { RequestPostComponent } from "./pages/profile/request-post/request-post.component";
import { UpdateProfileComponent } from "./pages/profile/update-profile/update-profile.component";
import { DashHomeComponent } from "./pages/profile/dash-home/dash-home.component";
import { HourlyPostComponent } from "./pages/profile/hourly-post/hourly-post.component";
import { MyMicrojobComponent } from "./pages/profile/my-microjob/my-microjob.component";
import { MyHourliesComponent } from "./pages/profile/my-hourlies/my-hourlies.component";
import { MyBuyerrequestsComponent } from "./pages/profile/my-buyerrequests/my-buyerrequests.component";

import { NavprofileComponent } from "./includes/navprofile/navprofile.component";
import { TypeComponent } from "./components/type/type.component";
import { HeadimgComponent } from "./includes/headimg/headimg.component";
import { BuyerReqComponent } from "./pages/buyer-req/buyer-req.component";
import { BuyerReqModule } from "./pages/buyer-req/buyer-req.module";
import { HourlyComponent } from "./components/hourly/hourly.component";
import { RequestPageComponent } from "./pages/request-page/request-page.component";
import { HourliesComponent } from "./pages/hourlies/hourlies.component";

import { MessagesComponent } from "./pages/profile/messages/messages.component";
import { TagInputModule } from "ngx-chips";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AlertComponent } from "./directives/alert/alert.component";
import { AlertService } from "./services/url/alert.service";
import { NgxSpinnerModule } from "ngx-spinner";
import { MicroserviceComponent } from "./pages/microservice/microservice.component";
import { HourliesPageComponent } from "./pages/hourlies-page/hourlies-page.component";
import { PaginatorComponent } from "./directives/paginator/paginator.component";
import { PortfolioPostComponent } from "./pages/profile/portfolio-post/portfolio-post.component";
import { OrdersComponent } from "./pages/profile/orders/orders.component";
import { PortfolioComponent } from "./components/portfolio/portfolio.component";
import { MessageDetailsComponent } from "./pages/profile/message-details/message-details.component";

import { TimeAgoPipe } from "time-ago-pipe";
import { FlashMessagesModule } from "angular2-flash-messages";
import { VerifyComponent } from "./pages/signup/verify/verify.component";
import { ForgotComponent } from "./pages/login/forgot/forgot.component";
import { ResetComponent } from "./pages/login/reset/reset.component";
import { StarRatingModule } from "angular-star-rating";
import { AdminDashboardComponent } from "./overwatch/admin-dashboard/admin-dashboard.component";
import { AdminLoginComponent } from './overwatch/admin-login/admin-login.component';
import { TruncatePipe } from './shared/pipe/truncate.pipe';
import { FormerrorDirective } from './directives/formerror.directive';
@NgModule({
  declarations: [
    AppComponent,
    FeaturedComponent,
    JobsComponent,
    HeaderComponent,
    NavbarComponent,
    HomeComponent,
    RequestsComponent,
    LoginComponent,
    ProfileComponent,
    FooterComponent,
    PostComponent,
    CategoryComponent,
    SignupComponent,
    JobPostComponent,
    RequestPostComponent,
    UpdateProfileComponent,
    DashboardComponent,
    DashHomeComponent,
    NavprofileComponent,
    AddDetailsComponent,
    TypeComponent,
    HeadimgComponent,
    BuyerReqComponent,
    HourlyComponent,
    RequestPageComponent,
    HourliesComponent,
    MessagesComponent,
    AlertComponent,
    HourlyPostComponent,
    MyMicrojobComponent,
    MyHourliesComponent,
    MyBuyerrequestsComponent,
    MicroserviceComponent,
    HourliesPageComponent,
    PaginatorComponent,
    PortfolioPostComponent,
    OrdersComponent,
    PortfolioComponent,
    TimeAgoPipe,
    VerifyComponent,
    ForgotComponent,
    ResetComponent,
    MessageDetailsComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    TruncatePipe,
    FormerrorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BuyerReqModule,
    TagInputModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    StarRatingModule.forRoot(),
    FlashMessagesModule.forRoot()
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule {}
