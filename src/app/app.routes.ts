import { Routes } from "@angular/router";
import { DashboardComponent } from "./presentation/routes/dashboard/dashboard.component";
import { HomeComponent } from "./presentation/routes/home/home.component";
import { LoginComponent } from "./presentation/routes/login/login.component";
import { NewNoteComponent } from "./presentation/routes/new-note/new-note.component";
import { ResetComponent } from "./presentation/routes/reset/reset.component";
import { SiginComponent } from "./presentation/routes/sigin/sigin.component";


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
