import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CartItem } from './cart-item.model';

import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  constructor(
    public cartSvc: ShoppingCartService
  ) {}

  removeCartItem(item: CartItem) {
    if(confirm("Removing item from cart, are you sure?")) {
      for(let index in this.cartSvc.cart) {
        if(this.cartSvc.cart[index] === item)
          this.cartSvc.removeItemFromCart(Number(index));
      }
    }
  }
}
