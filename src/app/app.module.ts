import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarModule } from './components/navbar/navbar.module';
import { MHttpInterceptor } from './interceptors/http-interceptor';
import { SongsComponent } from './components/songs/songs.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ArtistsModule } from './components/artists/artists.module';
import { SheetModule } from './components/sheet/sheet.module';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigningModule } from './components/signing/signing.module';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SongsComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SigningModule,
    NavbarModule,
    ArtistsModule,
    SheetModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
