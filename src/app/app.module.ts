import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MHttpInterceptor } from './interceptors/http-interceptor';
import { ProjectsComponent } from './components/projects/projects.component';
import { ArtistsModule } from './components/artists/artists.module';
import { SheetModule } from './components/sheet/sheet.module';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigningModule } from './components/signing/signing.module';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { SidebarModule } from './components/home/sidebar/sidebar.module';
import { AccueilComponent } from './components/accueil/accueil.component';
import { NavbarModule } from './components/home/navbar/navbar.module';
import { AccountModule } from './components/account/account.module';
import { SongsModule } from './components/songs/songs.module';
import { SharedModule } from './components/shared/shared.module';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    AccueilComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SigningModule,
    ArtistsModule,
    AccountModule,
    MatButtonModule,
    SharedModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NavbarModule,
    SidebarModule,
    SongsModule,
    SheetModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MHttpInterceptor,
      multi: true
    },
    AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
