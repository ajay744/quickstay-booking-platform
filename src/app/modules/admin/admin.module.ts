import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { UsersComponent } from './pages/users/users.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './layout/login/login.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
     DashboardComponent,
    PropertiesComponent,
    BookingsComponent,
    UsersComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileComponent,
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AdminModule { }
