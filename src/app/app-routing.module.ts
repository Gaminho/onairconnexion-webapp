import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistsComponent } from './components/artists/artists.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SongsComponent } from './components/songs/songs.component';
import { IsSignedInGuard } from './guards/is-signed-in.guard';

const routes: Routes = [
  { path: '', 
    component: HomeComponent, 
    canActivate: [IsSignedInGuard],
    children: [
      {
        path: '',
        component: ArtistsComponent
      },
      {
        path: 'artists',
        component: ArtistsComponent
      },
      {
          path: 'songs',
          component: SongsComponent
      },
      {
          path: 'projects',
          component: ProjectsComponent
      }
    ]     
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
