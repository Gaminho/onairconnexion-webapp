import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistsComponent } from './components/artists/artists.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { SubscriptionComponent } from './components/signing/subscription/subscription.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/signing/login/login.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AddSongComponent } from './components/songs/add-song/add-song.component';
import { SongListComponent } from './components/songs/song-list/song-list.component';
import { SongsComponent } from './components/songs/songs.component';
import { SongDetailComponent } from './components/songs/song-detail/song-detail.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', 
    component: HomeComponent, 
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: '',
        component: AccueilComponent
      },
      {
        path: 'home',
        component: AccueilComponent
      },
      {
        path: 'artists',
        component: ArtistsComponent
      },
      {
        path: 'songs',
        component: SongsComponent,
        children: [
          {
            path: 'list',
            component: SongListComponent
          },
          {
            path: 'detail/:songId',
            component: SongDetailComponent
          },
          {
            path: 'new',
            component: AddSongComponent
          },
          {
            path: '**',
            redirectTo: 'list'
          }
        ]
      },
      {
          path: 'projects',
          component: ProjectsComponent
      },
      {
          path: 'sheets',
          component: SheetComponent
      },
      {
        path: 'account',
        component: AccountComponent
      }
    ]     
  },
  { path: 'login', component: LoginComponent },
  { path: 'subscribe', component: SubscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
