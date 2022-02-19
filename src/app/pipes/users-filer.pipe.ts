import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersFiler'
})
export class UsersFilerPipe implements PipeTransform {

  transform(value: any, filterValue: string) {
   if(value.length === 0) {
     return value;
   }

   let filteredUsers = [];

   for(const user of value) {
     if (user.displayName?.toLowerCase().includes(filterValue.toLowerCase()) && filterValue !== '') {
       filteredUsers.push(user);
     }
   }
   return filteredUsers;
  }

}
