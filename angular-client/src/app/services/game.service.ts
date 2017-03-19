import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map'


@Injectable()
export class GameService {

  private BASE_URL = 'http://localhost:3000/';

  gamesList =  this.BASE_URL + 'games';

  constructor(private _http: Http) { }

  getGameList(query:string = null){
    if (query){
      this.gamesList = this.BASE_URL + 'games?query=' + query

    }
    return this._http.get(this.gamesList).map(res=>res.json())
  }
}
