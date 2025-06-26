import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AuthModule } from "./components/auth/auth.module";
import { ContactModule } from "./components/contact/contact.module";
import { routes } from "./app.routes";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ShopModule } from "./components/shop/shop.module";
import { SidebarMenuComponent } from "./components/sidebar-menu/sidebar-menu.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatOption, MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CommonModule, NgFor } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { AuthInterceptor } from "./auth.interceptor";
import { ProductsModule } from "./components/products/products.module";
import { ToastComponent } from "./components/toast/toast.component";
@NgModule({
  declarations: [AppComponent, SidebarMenuComponent,ToastComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AuthModule,
    ContactModule,
    ShopModule,
    HttpClientModule,
    ProductsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    NgFor,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
