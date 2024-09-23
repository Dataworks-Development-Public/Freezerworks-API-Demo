import { Injectable, OnInit } from '@angular/core';
import { CartItem } from '../shopping-cart/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnInit{
  public cart: Array<CartItem> = [];

  constructor() { }

   addItemToCart(name: string, quantity: number): void {
    this.cart.push(new CartItem(name, quantity));
   }

   removeItemFromCart(itemIndex: number) {
    this.cart.splice(itemIndex, 1);
   }   

  updateItemQuantity(itemId: number, quantity: number) {
    this.cart[itemId].itemQty = quantity;
  }

  clearCart() {
    this.cart = [];
  }

   ngOnInit(): void {
   }


}
