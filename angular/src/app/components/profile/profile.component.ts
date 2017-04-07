import { Component, OnInit,AfterViewInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
 currentuser : User;
 users : User[];
 token : any;

  constructor(
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
    // console.log( this.currentuser);
    this.users.pop();
    this.users.push( this.currentuser);
    // console.log(this.users)
    // console.log('users users users :' +this.users)
   }

  
  
}

export interface User {
    username : String,
    email : String,
    gender : String
}