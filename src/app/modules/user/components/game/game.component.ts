import { Component, Input, OnInit } from '@angular/core';
import { Game } from "@app/interface/game"
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() game!: Game;
  constructor() { }

  ngOnInit(): void {
  }

}
