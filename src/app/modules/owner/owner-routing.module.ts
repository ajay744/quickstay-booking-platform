import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { AddPropertyComponent } from './pages/add-property/add-property.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { BoysPgComponent } from './pages/boys-pg/boys-pg.component';
import { GirlsPgComponent } from './pages/girls-pg/girls-pg.component';
import { PrivateRoomComponent } from './pages/private-room/private-room.component';
import { SharedRoomComponent } from './pages/shared-room/shared-room.component';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: OwnerComponent,
    canActivateChild: [authGuard],
    data: { role: 'owner' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'properties', component: PropertiesComponent },
      { path: 'addProperties', component: AddPropertyComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'boys-pg', component: BoysPgComponent },
      { path: 'girls-pg', component: GirlsPgComponent },
      { path: 'private-room', component: PrivateRoomComponent },
      { path: 'shared-room', component: SharedRoomComponent },
    ]
  }
  ,
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
