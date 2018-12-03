import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../../includes/navbar/navbar.component";
import { AddDetailsComponent } from './add-details/add-details.component';
import { VerifyComponent } from './verify/verify.component';

@NgModule({
  imports: [CommonModule, NavbarComponent],
  declarations: [AddDetailsComponent, VerifyComponent]
})
export class SignupModule {}
