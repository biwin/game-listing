import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {LocalStorageService} from "ng2-webstorage";

@Injectable()
export class GameService {

  private BASE_URL = 'http://localhost:3000/';

  gamesList =  this.BASE_URL + 'games';

  constructor(private _http: Http, private _ls: LocalStorageService) { }

  getGameList(){
    let headers = new Headers();
    let hash = this._ls.retrieve('hash');
    headers.append("Authorization", "Basic " + hash);
    return this._http.get(this.gamesList, {
      headers: headers
    }).map(res=>res.json())
  }

  search(query: Observable<string>) {
    return query.debounceTime(350)
      .distinctUntilChanged()
      .switchMap(_query => {
        let headers = new Headers();
        let hash = this._ls.retrieve('hash');
        headers.append("Authorization", "Basic " + hash);
        return this._http.get(this.gamesList + '?query=' + _query, {
          headers: headers
        })
          .map(res => res.json());
      });

  }
}
