import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gamesFilter'
})

export class GamesFilterPipe implements PipeTransform {

  transform(games: any, filter: any) {
    if(filter && Array.isArray(games)){
      let filteredGames = [];
      filteredGames = games.filter((game) => {
         return game.title?.toLowerCase().includes(filter.title.toLowerCase())
                && (game.price <= filter.price.to)
                && (game.genres.some((el: any) => {
                  return filter.genres.some( (el2: any) => (el2.id === el.id));
                }));
      });
      return filteredGames;
    }
    return games;
  }

}
