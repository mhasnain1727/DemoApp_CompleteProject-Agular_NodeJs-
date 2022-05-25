import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizComponent } from './dashboard/quiz/quiz.component';
import { UserComponent } from './dashboard/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  {
    path: "home", component: HomeComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "registration", component: RegistrationComponent, canDeactivate: [AuthGuard]
  },
  {
    path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard],
  },
  {
    path: "dashboard/profile", component: UserComponent, canActivate: [AuthGuard]
  },
  {
    path: "dashboard/quiz", component: QuizComponent, canActivate: [AuthGuard]
  },
  {
    path: "", redirectTo: "/home", pathMatch: "full"
  },
  {
    path: "**", redirectTo: "/home", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
