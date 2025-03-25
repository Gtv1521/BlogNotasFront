import { Routes } from '@angular/router'
import { HomeComponent } from './../routes/home/home.component';
import { LoginComponent } from './../routes/login/login.component';
import { SiginComponent } from './../routes/sigin/sigin.component';
import { ResetComponent } from '../routes/reset/reset.component';
import { DashboardComponent } from '../routes/dashboard/dashboard.component';
import { NewNoteComponent } from '../routes/new-note/new-note.component';


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
  { path: 'dashboard', component: DashboardComponent},
  { path: 'new_note', component: NewNoteComponent},
  { path: '**', redirectTo: '/home/login' }, 
]
