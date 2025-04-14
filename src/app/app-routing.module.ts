import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { authGuard } from './core/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
    
  },
  {
    path: 'owner',
    loadChildren: () =>
      import('./modules/owner/owner.module').then((m) => m.OwnerModule),
    canActivate: [authGuard],
    data: { role: 'owner' }
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivateChild: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
