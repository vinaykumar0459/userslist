import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
    url = 'http://localhost:3000/users/login';
    User : user;
    token : any;
    constructor(
    private http : Http
    ) {}
    login(User) {
        var headers = new Headers;
        headers.append('Content-Type', 'application/json; charset=utf-8')
        return this.http.post(this.url, JSON.stringify(User), {headers: headers})
        .map((response : Response) => {
            var emailbody = response['_body'];
            var msg = JSON.parse(emailbody);
            User.email = msg.email;
            User.username = msg.username;
            User.gender = msg.gender;
            var jsonuser = JSON.stringify(User);
            // login successfull if there is a jwt token in the response
            console.log(jsonuser);
            var token = msg.token;
           
            if(jsonuser && msg.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentuser', jsonuser);
                localStorage.setItem('token', token);
            } 
        });
    }
                
    
        logout() {
            this.User = null;
            localStorage.clear();
            localStorage.removeItem('currentuser');
            localStorage.removeItem('token');
        }
        check(){
            return localStorage.getItem('token');
        }
       
}
export interface user {
    username : String,
    email : String,
    password : String
}