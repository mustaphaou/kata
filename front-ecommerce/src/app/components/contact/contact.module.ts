import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContactComponent } from './contact.component';


@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,NgFor,ReactiveFormsModule,MatFormFieldModule,MatInputModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[ContactComponent]
})
export class ContactModule { }
