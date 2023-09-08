import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLogin } from './login/login.component';
import { AppHome } from './home/home.component';
import { AppAbout } from './about/about.component';
import { AppProfile } from './profile/profile.component';
import { LoginGuard } from './login-guard.service';
import { AppSummaryView } from './ui-components/summary-view/summary-view.component';
import { AppStatusView } from './ui-components/status-view/status-view.component';

const routes: Routes = [
  {
    path: "login",
    component: AppLogin,
    pathMatch: "full"
  },
  {
    path: "home",
    component: AppHome,
    pathMatch: "full",
    canActivate: [LoginGuard]
  },
  {
    path: "summary",
    component: AppSummaryView,
    pathMatch: "full",
    canActivate: [LoginGuard]
  },
  {
    path: "about",
    component: AppAbout,
    pathMatch: "full",
    canActivate: [LoginGuard]
  },
  {
    path: "profile",
    component: AppProfile,
    pathMatch: "full",
    canActivate: [LoginGuard]
  },
  {
    path: "status",
    component: AppStatusView,
    pathMatch: "full",
    canActivate: [LoginGuard]
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
