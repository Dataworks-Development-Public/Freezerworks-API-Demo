import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss'
})
export class ItemDetailComponent{
  @Input({ required: true }) sampleType!: string;
  quantity: number = 1;

  constructor(
    private Router: Router,
    private cartSvc: ShoppingCartService
  ) { }

  onAddToCartClick(): void {
    // TODO: need to check if the requested QTY is actually available
    this.cartSvc.setQuantity(this.sampleType, this.quantity);
    this.Router.navigateByUrl('/samples');
  }


}
