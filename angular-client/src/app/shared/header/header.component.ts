import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "ng2-webstorage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  private loggedIn;

  constructor(private _ls: LocalStorageService, private _router: Router) {
    this.getSignInStatus();
  }

  ngOnInit() {

    this._ls.observe('loggedIn').subscribe(
      res=>this.loggedIn = res
    )
  }

  getSignInStatus(){
    this.loggedIn = this._ls.retrieve('loggedIn')
  }

  signOut(){
    this._ls.clear('hash');
    this._ls.clear('loggedIn');
    this._router.navigate(['/'])
  }

}
