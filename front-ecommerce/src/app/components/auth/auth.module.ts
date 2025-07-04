import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [LoginComponent,RegisterComponent]
})
export class AuthModule { }
