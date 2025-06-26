import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardActions, MatCardContent, MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ProductsComponent } from './products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ProductsComponent, ProductFormComponent],
  imports: [
    CommonModule, 
    NgFor, 
    ReactiveFormsModule, 
    MatSelectModule, 
    MatCardModule, 
    MatIconModule, 
    RouterModule, 
    MatFormFieldModule,
    MatInputModule,
    MatCardActions,
    RouterModule,
    MatCardContent,
  ],
  exports: [ProductsComponent, ProductFormComponent]
})
export class ProductsModule { }
