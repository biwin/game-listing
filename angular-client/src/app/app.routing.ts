import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {LandingComponent} from "./pages/landing/landing.component";


const appRoutes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'games',
    component: HomeComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const AppRoutes = RouterModule.forRoot(appRoutes);
