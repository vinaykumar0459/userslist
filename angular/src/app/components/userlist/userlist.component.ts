import { Component, OnInit, Input ,OnChanges } from '@angular/core';
import { UsersService } from '../../users.service';
import {ActivatedRoute,Params} from '@angular/router';
import { SharedService } from '../../shared.service';

// import { UserscomponentComponent } from '../userscomponent/userscomponent.component';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  
  data:any;
  // userId:any;
  // userdetail:any;
  // data1:any;
  
constructor(
  private route:ActivatedRoute,
  private allusers:UsersService,
  private _sharedService:SharedService
  ){} 
ngOnInit(){
 this.data =  this._sharedService.case;
}
}