import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {LandingComponent} from "./pages/landing/landing.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {LoginComponent} from "./pages/login/login.component";


const appRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: SignupComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
  {
    path: 'games',
    component: HomeComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const AppRoutes = RouterModule.forRoot(appRoutes);
