import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map'


@Injectable()
export class GameService {

  private BASE_URL = 'http://localhost:3000/';

  constructor(private _http: Http) { }

  getGameList(){
    return this._http.get(this.BASE_URL + 'games').map(res=>res.json())
  }
}
