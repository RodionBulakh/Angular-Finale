import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Game} from "@app/interface/game";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  readonly API_URL = 'assets/games.json'

  games: Observable<Game[]>;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }


  getGames() {
   this.games = this.http.get<Game[]>(this.API_URL);
  }
}
