import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


import { ShoppingCartService } from '../services/shopping-cart.service';
import { KeyValuePipe } from '@angular/common';
import { AliquotsService } from '../services/aliquots.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FormsModule, RouterLink, KeyValuePipe],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  constructor(
    public aliquotSvc: AliquotsService,
    public cartSvc: ShoppingCartService
  ) {}  

  quantityChangeVerification(name: string, value: number) {
    if(this.aliquotSvc.availableAliquotGroups) {
      let qtyAvailable = this.aliquotSvc.availableAliquotGroups[name].length;
      if(value > qtyAvailable) {
        alert("Seleceted quantity exceeds quantity available");
        this.cartSvc.cart[name] = qtyAvailable;
      }
      else if(value < 1) {
        alert("Quantity must be at least 1");
        this.cartSvc.cart[name] = 1;
      }
    }
  }

  removeCartItem(sampleType: string) {
    if(confirm("Removing item from cart, are you sure?")) {
      this.cartSvc.removeFromCart(sampleType);
    }
  }
}
