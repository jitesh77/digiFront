import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { NavbarComponent } from "../../includes/navbar/navbar.component";
// import { HeaderComponent } from "../../components/header/header.component";
// import { FeaturedComponent } from "../../components/featured/featured.component";
// import { RequestsComponent } from "../../components/requests/requests.component";
// import { FooterComponent } from "../../includes/footer/footer.component";
// import { JobsComponent } from "../../components/jobs/jobs.component";
// import { TypeComponent } from "../../components/type/type.component";
// import { HourlyComponent } from "../../components/hourly/hourly.component";
import { StarRatingModule } from "angular-star-rating";

@NgModule({
  imports: [CommonModule, StarRatingModule],
  declarations: [
    // HeaderComponent,
    // NavbarComponent,
    // FeaturedComponent,
    // RequestsComponent,
    // FooterComponent,
    // JobsComponent,
    // TypeComponent,
    // HourlyComponent
  ]
})
export class HomeModule {}
