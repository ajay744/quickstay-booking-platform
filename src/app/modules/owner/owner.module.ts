import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerComponent } from './owner.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { AddPropertyComponent } from './pages/add-property/add-property.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { BoysPgComponent } from './pages/boys-pg/boys-pg.component';
import { GirlsPgComponent } from './pages/girls-pg/girls-pg.component';
import { PrivateRoomComponent } from './pages/private-room/private-room.component';
import { SharedRoomComponent } from './pages/shared-room/shared-room.component';
import { SignupComponent } from './layout/signup/signup.component';
import { LoginComponent } from './layout/login/login.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    OwnerComponent,
    DashboardComponent,
    PropertiesComponent,
    AddPropertyComponent,
    BookingsComponent,
    PaymentsComponent,
    ProfileComponent,
    ReviewsComponent,
    SidebarComponent,
    NavbarComponent,
    BoysPgComponent,
    GirlsPgComponent,
    PrivateRoomComponent,
    SharedRoomComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class OwnerModule { }
