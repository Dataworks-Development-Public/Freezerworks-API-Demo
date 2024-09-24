import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    public cartSvc: ShoppingCartService,
    private Router: Router
  ) { }

  onAddToCartClick(): void {
    // TODO: need to check if the requested QTY is actually available
    this.cartSvc.addItemToCart(this.sampleType, this.quantity);
    this.Router.navigateByUrl('/samples');
  }


}
