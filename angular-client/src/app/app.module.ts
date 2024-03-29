import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {AppRoutes, appRoutingProviders} from "./app.routing";
import {GameService} from "./services/game.service";
import { GameCardComponent } from './cards/game-card/game-card.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import {Ng2Webstorage} from "ng2-webstorage";
import {Ng2PaginationModule} from "ng2-pagination";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    GameCardComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes,
    Ng2PaginationModule,
    Ng2Webstorage.forRoot({
      separator: '_',
      prefix: ''
    })
  ],
  providers: [
    appRoutingProviders,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
