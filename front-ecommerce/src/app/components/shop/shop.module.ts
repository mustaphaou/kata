import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop.component';

@NgModule({
  declarations: [CartComponent,ShopComponent],
  imports: [
    CommonModule,NgFor,ReactiveFormsModule,    ReactiveFormsModule,
    MatSelectModule,MatCardModule,MatIconModule,RouterModule,    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports : [CartComponent,ShopComponent]
})
export class ShopModule { }
