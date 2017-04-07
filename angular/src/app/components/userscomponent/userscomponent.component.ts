import { Component, OnInit ,OnChanges} from '@angular/core';
import { UsersService } from '../../users.service';
import { FilterPipe } from '../../filter.pipe';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-userscomponent',
  templateUrl: './userscomponent.component.html',
  styleUrls: ['./userscomponent.component.css'],
  
})
export class UserscomponentComponent implements OnInit {
  usersdata: any;
  search : any;
  constructor(
    private usersservice : UsersService,
    private router : Router,
    private _sharedService:SharedService
  ) { }

  ngOnInit() {
    this.usersservice.getallusers()
    .subscribe( users => {
      this.usersdata = users;
      // console.log(users);
      // for(var i=0;i<users.length; i++) {
        
      //   console.log(users[i].name);
      //   console.log(users[i].email);
      //   console.log(users[i].username);
      // }
    })
    //console.log(this.search);
  }
 //ngOnChanges(){}
  userlist(user) {
    this._sharedService.case =user;
    this.router.navigate(['/allusers', user.name]);
    // console.log(user.name); 
  }
}
