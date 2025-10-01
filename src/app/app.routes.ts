import { Routes } from "@angular/router";
import { DashboardComponent } from "./presentation/routes/dashboard/dashboard.component";
import { HomeComponent } from "./presentation/routes/home/home.component";
import { LoginComponent } from "./presentation/routes/login/login.component";
import { ResetComponent } from "./presentation/routes/reset/reset.component";
import { SiginComponent } from "./presentation/routes/sigin/sigin.component";
import { SettingsComponent } from "./presentation/components/Flotantes/settings/settings.component";
import { NewNotebookComponent } from "./presentation/components/Flotantes/new-notebook/new-notebook.component";
import { NoteDataComponent } from "./presentation/components/Dasboard/note-data/note-data.component";
import { LoaderComponent } from "./presentation/components/loader/loader-point/loader.component";
import { WellcomeComponent } from "./presentation/components/loader/wellcome/wellcome.component";


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sigin', component: SiginComponent },
      { path: 'reset', component: ResetComponent },
    ],
  }, // home
  { path: 'wellcome', component: WellcomeComponent }, // spiner bienvenida signin
  { path: 'loader', component: LoaderComponent }, // spiner de inicio
  { path: 'home', component: DashboardComponent }, // home
  { path: 'settings', component: SettingsComponent }, // configuraciones
  { path: 'new_book', component: NewNotebookComponent }, // nuevo libro
  { path: 'new_note/:libreta', component: NoteDataComponent }, // nueva nota
  { path: 'note/:id', component: NoteDataComponent }, // abre nota ya creada
  { path: '**', redirectTo: '/login' }, // default
]
