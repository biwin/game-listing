import {Component, OnInit, Input} from '@angular/core';
import {Game} from "../../interfaces/game";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.sass']
})
export class GameCardComponent implements OnInit {

  @Input() game: Game;

  constructor() { }

  ngOnInit() {
  }

}
