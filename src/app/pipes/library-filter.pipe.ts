import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'libraryFilter'
})
export class LibraryFilterPipe implements PipeTransform {

  transform(allGames: any, addedGames: any) {

    let filteredGames = [];

      if(Array.isArray(addedGames) && Array.isArray(allGames)) {
        // filteredGames = allGames.forEach((game) => {
        //     if (addedGames.includes(game.id)) {
        //       filteredGames.push(game);
        //     }
        //   });
        filteredGames = allGames.reduce(function (newArr, game) {
          if (addedGames.includes(game.id)) {
            newArr.push(game);
          }
          return newArr;
        }, []);
      }

    return filteredGames;
    }

}
