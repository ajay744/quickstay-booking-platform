import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HomeComponent } from './pages/home/home.component';
import { BookingComponent } from './pages/booking/booking.component';
import { BoysPgComponent } from './pages/boys-pg/boys-pg.component';
import { GirlsPgComponent } from './pages/girls-pg/girls-pg.component';
import { SharedRoomComponent } from './pages/shared-room/shared-room.component';
import { PrivateRoomComponent } from './pages/private-room/private-room.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { ViewDetailsComponent } from './pages/view-details/view-details.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    UserComponent,
    UserDashboardComponent,
    HomeComponent,
    BookingComponent,
    NavbarComponent,
    FooterComponent,
    BoysPgComponent,
    GirlsPgComponent,
    SharedRoomComponent,
    PrivateRoomComponent,
    LoginComponent,
    SignupComponent,
    ViewDetailsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ]
})
export class UserModule { }
