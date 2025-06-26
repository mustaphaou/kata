import { Component } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(private productService: ProductService, public authService: AuthService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.toastService.show('Produit supprimé avec succès !');

      this.products = this.products.filter(product => product.id !== id);
    });
  }
}
