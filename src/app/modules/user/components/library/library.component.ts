import { Component, OnInit } from '@angular/core';
import {Game} from "@app/interface/game";
import {GamesService} from "@app/services/games.service";
import {HotToastService} from "@ngneat/hot-toast";
import {UsersService} from "@app/services/users.service";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  user$ = this.userService.currentUserProfile$;

  games: Game[] = []; 

  constructor(private gamesService: GamesService, private toast: HotToastService, private userService: UsersService) { }

  ngOnInit(): void {
    this.gamesService.getGames().subscribe( games => {
      this.games = games as Game[];
    }, err => {
      console.error("Error: unsuccessful fetch games")
    })
  }
}
