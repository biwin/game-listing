import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const AppRoutes = RouterModule.forRoot(appRoutes);
