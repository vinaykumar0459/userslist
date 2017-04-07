import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { AppService } from '../../app.service';
import { tokenNotExpired } from 'angular2-jwt';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentuser : User;
  users : User[];
  token : any;
 
  constructor(
    private router : Router,
    private authservice : AuthService
  ) { 
    this.users = [{
    username : "",
    email : "",
    gender : ''
    }];
    this.currentuser = {
    username : "",
      email : "",
      gender : ''
    };
  }

  ngOnInit() {
    this.currentuser = JSON.parse(localStorage.getItem('currentuser'));
    this.users.pop();
    this.users.push(this.currentuser);
    this.token = this.authservice.check();
    console.log(this.token);
  }
   logout() {
        console.log('logged out successfully', 'currentuser') ;
        // remove user from localstorage to log user logout
        localStorage.removeItem('currentuser');
        localStorage.removeItem('token');
        this.router.navigate(['/']);
        
        // this.authservice.logout();
        // this.authservice.token = null;
        
    }
    

}

export interface User {
  username : String,
  email : String,
  gender : String
}