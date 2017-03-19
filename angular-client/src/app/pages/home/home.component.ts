import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {Game} from "../../interfaces/game";
import {Subject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public games: Game[];

  searchTerm = new Subject<string>();

  public sortOptions: any[] = [
    { "optionId": 'sH', "optionName": "Score: Higher first" },
    { "optionId": 'sL', "optionName": "Score: Lower first" },
    { "optionId": 'pA', "optionName": "Platform: A->Z" },
    { "optionId": 'pZ', "optionName": "Platform: Z->A" },
    { "optionId": 'gA', "optionName": "Genre: A->Z" },
    { "optionId": 'gZ', "optionName": "Genre: Z->A" },
    { "optionId": 'eF', "optionName": "Editors Choice First" },
    { "optionId": 'eL', "optionName": "Editors Choice Last" },
    { "optionId": 'tA', "optionName": "Title: A-Z" },
    { "optionId": 'tZ', "optionName": "Title: Z-A" }
  ];


  constructor(private _game: GameService) {
    this.searchTerm.debounceTime(300).distinctUntilChanged().subscribe(res=>{
      console.log("trying...");
      _game.getGameList(res).subscribe(_res => {
        this.games = _res;
      })
    })
  }

  ngOnInit() {
    this.getGameList();
  }

  getGameList(query: string = null){
    this._game.getGameList(query).subscribe(res=>{
      this.games = res;
    })
  }


  sortData(key){
    if (key === 'sL' ){
      this.games = this.sortGames(this.games, 'score', true);
    } else if (key === 'sH') {
      this.games = this.sortGames(this.games, 'score', true).reverse();
    } else if (key === 'pZ'){
      this.games = this.sortGames(this.games, 'platform').reverse();
    } else if (key === 'pA'){
      this.games = this.sortGames(this.games, 'platform');
    } else if (key === 'gZ'){
      this.games = this.sortGames(this.games, 'genre').reverse();
    } else if (key === 'gA'){
      this.games = this.sortGames(this.games, 'genre');
    } else if (key === 'eF') {
      this.games = this.sortGames(this.games, 'editors_choice').reverse();
    } else if (key === 'eL'){
      this.games = this.sortGames(this.games, 'editors_choice');
    } else if (key === 'tA'){
      this.games = this.sortGames(this.games, 'title');
    } else if (key === 'tZ'){
      this.games = this.sortGames(this.games, 'title').reverse();
    }
  }

  sortGames(array, key, Number=false){
    if (Number){
      return array.sort((a, b)=>{
        let x = a[key];
        let y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }
    return array.sort((a, b)=>{
      let x = a[key];
      let y = b[key];
      return ((x.toLowerCase() < y.toLowerCase()) ? -1 : ((x.toLowerCase() > y.toLowerCase()) ? 1 : 0));
    });
  }

}
