import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Game} from "@app/interface/game";
import {HttpClient} from "@angular/common/http";
import { GameComponent } from '../game/game.component';
import {NgForm} from '@angular/forms';

interface searchGameObj {
  title: string,
  price: {
    from: number,
    to: number
  },
  genres: string[]
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})


export class GamesComponent implements OnInit {
  readonly API_URL = 'assets/games.json'
  games: Game[] = [];

  maxPrice: number;
  searchPrice: number;

  searchQueryObj: searchGameObj;
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.getGames().subscribe( games => {
      this.games = games as Game[];
      this.maxPrice = Math.max.apply(Math, this.games.map(el => el.price));
      this.searchPrice = this.maxPrice;
    }, err => {
      console.error("Error: unsuccessful fetch games")
    });

    
  }

  getGames() {
    return this.http.get<Game[]>(this.API_URL);
  }

  renderGames(searchTitle: string){
    this.searchQueryObj = {title: searchTitle, price: {from: 0 , to: this.searchPrice}, genres: []}
    this.getGames().subscribe( games => {
      this.games = games as Game[]
    }, err => {
      console.error("Error: unsuccessful fetch games")
    })
  }
}
