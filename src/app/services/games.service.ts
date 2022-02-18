import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game} from "@app/interface/game";
import { Observable } from 'rxjs';
import { Genre } from '@app/interface/genre';
@Injectable({
  providedIn: 'root'
})
export class GamesService {
  readonly API_URL_GAMES = 'assets/games.json';
  readonly API_URL_GENRES = 'assets/genres.json';
  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(this.API_URL_GAMES);
  }

  getGenres(): Observable<Genre[]>{
    return this.http.get<Genre[]>(this.API_URL_GENRES);
  }
}
