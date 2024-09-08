import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { AboutComponent } from './components/about/about.component'
import { NotFountComponent } from './Router/not-fount/not-fount.component';
import { LoginComponent } from './Router/login/login.component';
import { SiginComponent } from './Router/sigin/sigin.component';
import { DashboardComponent } from './Router/dashboard/dashboard.component';
import { InicioComponent } from './Router/inicio/inicio.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'inicio', component: InicioComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sigin', component: SiginComponent },
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
    ]
  },

  { path: '**', component: NotFountComponent }
];

