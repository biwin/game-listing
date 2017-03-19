import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  createUser = "http://localhost:3000/users";
  constructor(private _http: Http, private router: Router) { }

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
          this.router.navigate(['/login'])
        }
      });
  }

}
