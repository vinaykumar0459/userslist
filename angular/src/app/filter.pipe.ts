import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(users: any, search: any): any {
    // check if search is undefined
    if(search === undefined) return users;
    // return updated users array
    return users.filter(function(user) {
      return user.name.includes(search) || user.username.includes(search);
    })
  }

}
