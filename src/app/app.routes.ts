import { Routes } from '@angular/router'
import { HomeComponent } from './../routes/home/home.component';
import { LoginComponent } from './../routes/login/login.component';
import { SiginComponent } from './../routes/sigin/sigin.component';
import { ResetComponent } from '../routes/reset/reset.component';
import { DashboardComponent } from '../routes/dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home/login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sigin', component: SiginComponent },
      { path: 'reset', component: ResetComponent },
    ],
  },
  { path: 'dashboard/:id', component: DashboardComponent},
  { path: '**', redirectTo: '/home/login' }, 
]
