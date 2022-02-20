import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendsFilter'
})
export class FriendsFilterPipe implements PipeTransform {

  transform(value: any, filterValue: any[]) {
    if(value.length === 0) {
      return value;
    }

    if(!Array.isArray(filterValue)) {
      return;
    }

    let filteredFriends: any[] = [];

    for(const user of value) {
      filterValue.forEach(uid => {
        if (user.uid === uid) {
          filteredFriends.push(user);
        }
      })
    }
    return filteredFriends;
  }

}
