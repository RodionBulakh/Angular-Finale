import { Component, OnInit } from '@angular/core';
import {Game} from "@app/interface/game";
import {GamesService}  from  "@app/services/games.service"
import { Genre } from '@app/interface/genre';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
interface searchGameObj {
  title: string,
  price: {
    from: number,
    to: number
  },
  genres: Genre[]
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})


export class GamesComponent implements OnInit {

  filtersGroup: FormGroup;

  games: Game[] = [];
  genres: Genre[] = [];
  maxPrice: number;

  filtersOpen = true;

  searchQueryObj: searchGameObj;
  constructor(private gamesService: GamesService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.filtersGroup = this.formBuilder.group({
      priceEnd: new FormControl(0),
      genres: new FormArray([]),
    });

    this.gamesService.getGames().subscribe( games => {
      this.games = games as Game[];
      this.maxPrice = Math.max.apply(Math, this.games.map(el => el.price));
      this.filtersGroup.controls['priceEnd'].setValue(this.maxPrice);
    }, err => {
      console.error("Error: unsuccessful fetch games")
    })


    this.gamesService.getGenres().subscribe( genres => {
      this.genres = genres;
      this.addCheckBoxesGenres();
    }, err => {
      console.error("Error: unsuccessful fetch genres")
    });


  }

  addCheckBoxesGenres(){
    this.genres.forEach(() => this.genresFormArray.push(new FormControl(true)));
  }

  get genresFormArray(){
    return this.filtersGroup.controls['genres'] as FormArray;
  }
  renderGames(searchTitle: string){
    let searchGenres: Genre[] = [];
    this.filtersGroup.value.genres.forEach((el: boolean, index: number) => {
      if(el){
        searchGenres.push(this.genres[index]);
      }
    });
    this.searchQueryObj = {title: searchTitle, price: {from: 0 , to: this.filtersGroup.value.priceEnd}, genres: searchGenres};
  }
}
