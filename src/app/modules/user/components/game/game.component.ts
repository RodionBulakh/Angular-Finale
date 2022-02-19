import { Component, Input } from '@angular/core';
import { Game } from "@app/interface/game"
import {HotToastService} from "@ngneat/hot-toast";
import {UsersService} from "@app/services/users.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  user$ = this.userService.currentUserProfile$;

  @Input() game!: Game;
  constructor(private toast: HotToastService, private userService: UsersService) { }


  addToLibrary(uid: string, gameId: string, addedGames: any) {

    if([...addedGames].includes(gameId)) {
      alert('Game is already added');
      return;
    }

    const gameData = {
      uid: uid,
      favorites: [gameId, ...addedGames],
    }

    this.userService
      .updateUser(gameData)
      .pipe(
        this.toast.observe({
          success: 'Game added successfully',
          loading: 'Loading...',
          error: 'There was an error in updating your library',
        })
      )
      .subscribe();
  }

}
