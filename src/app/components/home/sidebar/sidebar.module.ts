import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { MatListModule } from '@angular/material';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
