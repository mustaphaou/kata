import { Component } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService, private toastService: ToastService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => (this.products = data));
  }


  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe({
      next: (cartItem) => {
      this.toastService.show('Produit ajouté au panier avec succès !');

      },
      error: (err) => {
      }
    });
  }

}
