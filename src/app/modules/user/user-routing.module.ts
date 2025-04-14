import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { HomeComponent } from './pages/home/home.component';
import { BookingComponent } from './pages/booking/booking.component';
import { BoysPgComponent } from './pages/boys-pg/boys-pg.component';
import { GirlsPgComponent } from './pages/girls-pg/girls-pg.component';
import { PrivateRoomComponent } from './pages/private-room/private-room.component';
import { SharedRoomComponent } from './pages/shared-room/shared-room.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { ViewDetailsComponent } from './pages/view-details/view-details.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'boys-pg', component: BoysPgComponent },
      { path: 'girls-pg', component: GirlsPgComponent },
      { path: 'private-room', component: PrivateRoomComponent },
      { path: 'shared-room', component: SharedRoomComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'dashboard', component: UserDashboardComponent,
       canActivate: [authGuard],
        data: { role: 'user' }
      },
      {
        path: 'view-details', component: ViewDetailsComponent,
        canActivate: [authGuard],
        data: { role: 'user' }
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

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
