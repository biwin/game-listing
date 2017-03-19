import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  createUser = "http://localhost:3000/users";
  created = false;
  constructor(private _http: Http) { }

  ngOnInit() {
  }

  submitForm(formData) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this._http
      .post(this.createUser, JSON.stringify(formData), {
        headers: headers
      })
      .subscribe(res=>{
        if (res.status == 201){
          this.created = true;
        }
      });
  }

}
