import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { FormsModule } from '@angular/forms';

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
    public cartSvc: ShoppingCartService
  ) { }

  onAddToCartClick(): void {
    this.cartSvc.addItemToCart(this.sampleType, this.quantity);
  }


}
