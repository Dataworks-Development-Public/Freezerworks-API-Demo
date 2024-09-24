import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnInit{
  public cart: Record<string, number> = {}; // maps sampleType -> amount to requisition

  constructor() { }

  setQuantity(name: string, quantity: number) {
    this.cart[name] = quantity;
  }

  removeFromCart(name: string) {
    delete this.cart[name];
  }

  clearCart() {
    this.cart = {};
  }

   ngOnInit(): void {
   }
}
