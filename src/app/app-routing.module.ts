import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistsComponent } from './components/artists/artists.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { LoginComponent } from './components/signing/login/login.component';
import { SubscriptionComponent } from './components/signing/subscription/subscription.component';
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
      },
      {
          path: 'sheets',
          component: SheetComponent
      }
    ]     
  },
  { path: 'login', component: LoginComponent },
  { path: 'subscribe', component: SubscriptionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
