import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [LoginComponent, SubscriptionComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent, SubscriptionComponent]
})
export class SigningModule { }
