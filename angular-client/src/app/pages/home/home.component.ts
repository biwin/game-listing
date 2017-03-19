import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {Game} from "../../interfaces/game";
import {Subject} from "rxjs";
import {LocalStorageService} from "ng2-webstorage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  private loggedIn;

  public games: Game[];
  query = new Subject<string>();

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


  constructor(private _game: GameService, private _ls: LocalStorageService, private _router: Router) {
    _game.search(this.query)
      .subscribe(results => {
        this.games = results;
        console.log(results)
      });
  }

  ngOnInit() {
    this._ls.observe('loggedIn').subscribe(
      res=>this.loggedIn = res
    );

    this._game.getGameList().subscribe(res=>{
      this.games = res;
    });

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
