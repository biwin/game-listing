import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {Game} from "../../interfaces/game";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  private games: Game[];

  constructor(private _game: GameService) { }

  ngOnInit() {
    this._game.getGameList().subscribe(res=>{
      this.games = res;
    })

  }

}
