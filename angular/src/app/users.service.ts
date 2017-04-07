import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()

export class UsersService {
    constructor(
        private http : Http
    ){}
    getallusers() {
        var headers = new Headers;
        headers.append('Content-Type', 'application/json; charset=utf-8')
        return this.http.get('http://localhost:3000/users/allusers', { headers : headers})
            .map((response : Response) => 
                response.json()
            );
    };
}