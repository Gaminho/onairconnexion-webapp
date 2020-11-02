import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminDirective } from 'src/app/directives/admin.directive';



@NgModule({
  declarations: [
    ActionBarComponent,
    AdminDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FontAwesomeModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [ActionBarComponent]
})
export class SharedModule { }
