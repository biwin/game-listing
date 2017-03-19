import { Component, OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {LocalStorageService} from "ng2-webstorage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private _http: Http, private _ls: LocalStorageService, private _router: Router) { }

  ngOnInit() {
  }


  submitForm(formData) {
    let hash = btoa(formData.username + ":" + formData.password);
    let headers = new Headers();
    headers.append("Authorization", "Basic " + hash);
    this._ls.store('hash', hash);
    this._http.get('http://localhost:3000/games', {
      headers: headers
    }).subscribe(res=>{
      if (res.status === 200){
        this._router.navigate(['/games'])
      }
    });

  }

}

export interface Context{
  username: string,
  password: string
}
