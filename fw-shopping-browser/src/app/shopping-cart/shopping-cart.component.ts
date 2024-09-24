import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


import { ShoppingCartService } from '../services/shopping-cart.service';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FormsModule, RouterLink, KeyValuePipe],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  constructor(
    public cartSvc: ShoppingCartService
  ) {}

  removeCartItem(sampleType: string) {
    if(confirm("Removing item from cart, are you sure?")) {
      this.cartSvc.removeFromCart(sampleType);
    }
  }
}
