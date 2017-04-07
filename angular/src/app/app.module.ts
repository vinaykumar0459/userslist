import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppRoutingModule }     from './app.routing';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsersService } from './users.service';
import { UserscomponentComponent } from './components/userscomponent/userscomponent.component';
import { FilterPipe } from './filter.pipe';
import { UserlistComponent } from './components/userlist/userlist.component';
import {SharedService} from './shared.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EqualValidator } from './components/register/equal-validator.directive';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NotfoundComponent,
    UserscomponentComponent,
    FilterPipe,
    UserlistComponent,
    EqualValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule
  ],
  providers: [AppService, AuthGuard, AuthService, UsersService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
