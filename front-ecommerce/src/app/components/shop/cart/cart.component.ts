import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
cartItems: CartItem[] = [];
subtotal = 0;
shipping = 0;
constructor(private cartService:CartService){

}
ngOnInit() {
  this.cartService.getCartItems().subscribe(items => {
    this.cartItems = items;
    this.calculateTotal();
  });
}

calculateTotal() {
  this.subtotal = this.cartItems.reduce(
    (sum, item) => sum + (item.product.price || 0) * (item.quantity || 1),
    0
  );
}


increaseQty(item: CartItem) {
  const newQty = item.quantity + 1;
  this.cartService.updateQuantity(item.id, newQty).subscribe(updatedItem => {
    item.quantity = updatedItem.quantity;
    this.calculateTotal();
  });
}

decreaseQty(item: CartItem) {
  if (item.quantity > 1) {
    const newQty = item.quantity - 1;
    this.cartService.updateQuantity(item.id, newQty).subscribe(updatedItem => {
      item.quantity = updatedItem.quantity;
      this.calculateTotal();
    });
  }
}


remove(id: number) {
  this.cartService.removeProduct(id).subscribe(() => {
    this.cartItems = this.cartItems.filter(item => item.id !== id);

    this.calculateTotal();
  });
}


}
