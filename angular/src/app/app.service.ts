import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
// import { tokenNotExpired } from 'angular2-jwt';

@Injectable() 

export class AppService {
    authtoken : any;
    user : any;
    url: string;
    data : any;
    constructor(
        private http : Http) {}
    postservice() {
        var headers = new Headers;
        headers.append('Content-Type', 'application/json; charset=utf-8')
        return this.http.post(this.url, this.data, {headers: headers})
        .map(res => res);
    }
    getservice() {
        var headers = new Headers;
        headers.append('Content-Type', 'application/json; charset=utf-8')
        return this.http.get(this.url, {headers:headers})
        .map(res => res);
    }
}