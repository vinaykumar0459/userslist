import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppComponent } from './app.component'
import { AuthGuard } from './auth.guard';
import { UserscomponentComponent } from './components/userscomponent/userscomponent.component';
import { UserlistComponent } from './components/userlist/userlist.component'; 

const routes: Routes = [
  { path: '', component : LoginComponent },
  { path : 'profile', component : ProfileComponent, canActivate : [AuthGuard] },
  { path : 'register', component : RegisterComponent },
  { path : '*', component : NotfoundComponent},
  { path : 'allusers', component : UserscomponentComponent, canActivate : [AuthGuard] },
  { path : 'allusers/:name', component : UserlistComponent, canActivate : [AuthGuard]}
  

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}