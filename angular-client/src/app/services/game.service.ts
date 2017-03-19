import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class GameService {

  private BASE_URL = 'http://localhost:3000/';

  gamesList =  this.BASE_URL + 'games';

  constructor(private _http: Http) { }

  getGameList(){
    return this._http.get(this.gamesList).map(res=>res.json())
  }

  search(query: Observable<string>) {
    return query.debounceTime(350)
      .distinctUntilChanged()
      .switchMap(_query => {
        return this._http.get(this.gamesList + '?query=' + _query)
          .map(res => res.json());
      });

  }
}
