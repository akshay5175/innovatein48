import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLogin } from './login/login.component';
import { AppHome } from './home/home.component';
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
    pathMatch: "full"
  },
  {
    path: "summary",
    component: AppSummaryView,
    pathMatch: "full"
  },
  {
    path: "status",
    component: AppStatusView,
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
