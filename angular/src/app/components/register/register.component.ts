import { Component, OnInit } from '@angular/core';
import { user } from './register';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  User : user;
  constructor(
    private flashmessage : FlashMessagesService,
    private router : Router,
    private registerservice : AppService
  ) { }

  ngOnInit() {
    this.User = {
    name : "",
    username : "",
    email : "",
    password : "",
    gender : "",
    image : undefined,   
   confirmPassword:""
    }
  }
  fileChange($event) : void {
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    var totalLength = inputValue.files;
    for(var i = 0; i < totalLength.length; i++) {
    var file:File = inputValue.files[i];
    console.log(file);
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.User.image = myReader.result;
      console.log('image source :' +this.User);
    }
    myReader.readAsDataURL(file);
    }
  }
  data;
  signupform(User) {
    if(User.name == ''||User.username == ''|| User.email == ''|| User.password == ''|| User.gender == '') {
      this.flashmessage.show('All Fields are Required', {cssClass: 'alert-danger', timeout: 3000});
    } else {
      if(User.password != User.confirmpassword) {
        this.flashmessage.show('Password do not match', {cssClass: 'alert-danger', timeout: 3000});
      } else {
        this.registerservice.data = User;
        this.registerservice.url = 'http://localhost:3000/users/register';
        this.registerservice.postservice().subscribe (res => {
          this.data = res['_body'];
          var msg = JSON.parse(this.data);
          console.log(msg);
          if(msg.code == 0) {
            this.flashmessage.show('Username already exists, please choose another username', {cssClass: 'alert-danger', timeout: 3000})
            this.router.navigate(['register']);
          }
          else if(msg.code == 1) {
            this.flashmessage.show('Email ID already exists', {cssClass : 'alert-danger', timeout: 3000});
            
          }
          else if(msg.code == 2) {
            this.flashmessage.show('User Registered Successfully', { cssClass : 'alert-success', timeout: 1000 });
            this.router.navigate(['/']);
          }
        });
        
        
      }
    }
  }
  
}
