import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AppService } from '../../app.service';
import { AuthService } from '../../auth.service'; 
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  User : user;
  loading = false;
  constructor(
    private router : Router,
    private flashmessage : FlashMessagesService,
    private loginservice : AppService,
    private authservice : AuthService
  ) { }

  ngOnInit() {
    this.User = {
      username : '',
      email : '',
      password : ''
    }
        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  data;
  login(User) {
    if(User.username == '', User.email == '', User.password == '') {
      this.flashmessage.show('Invalid Credentials', { cssClass : 'alert-danger', timeout: 3000 })
    } else {
      this.loginservice.data = User;
      this.loginservice.url = 'http://localhost:3000/users/login';
      this.loginservice.postservice().subscribe(res => {
        this.data = res['_body'];
        var msg = JSON.parse(this.data);
        if(msg.code == 0) {
          this.flashmessage.show('Username or Email ID is wrong', { cssClass : 'alert-danger', timeout : 3000})
        } 
        else if(msg.code == 1) {
          this.flashmessage.show('Invalid Password', { cssClass : 'alert-danger', timeout : 3000 })
        }
        else if(msg.code == 2 ) {
          this.loading = true;
          this.authservice.login(User)
            .subscribe(
                data => {
                    this.flashmessage.show('User Logged in Successfully', { cssClass : 'alert-success', timeout : 3000});
                    this.router.navigate(['/profile']);
                },
                error => {
                    this.flashmessage.show('Error while logging in', { cssClass : 'alert-danger', timeout : 3000})
                    this.router.navigate(['/'])
                    this.loading = false
                });
        }
      })
    }
  }
}

export interface user {
    username : String,
    email : String,
    password : String
}