import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { UserComponent } from './dashboard/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsComponent } from './dashboard/questions/questions.component';
import { QuizComponent } from './dashboard/quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    UserComponent,
    QuestionsComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
