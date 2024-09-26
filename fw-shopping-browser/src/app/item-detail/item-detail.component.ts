import { Component, Input, OnInit, ɵtriggerResourceLoading } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ShoppingCartService } from '../services/shopping-cart.service';
import { AliquotsService } from '../services/aliquots.service';
import { IconService } from '../services/icon.service';

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
    private cartSvc: ShoppingCartService,
    public aliquotSvc: AliquotsService,
    public iconSvc: IconService
  ) { }

  quantityChangeVerification(value: number) {
    if(this.aliquotSvc.availableAliquotGroups) {
      const qtyAvailable = this.aliquotSvc.availableAliquotGroups[this.sampleType].length
      if(value > qtyAvailable) {
        alert("Seleceted quantity exceeds quantity available");
        this.quantity = qtyAvailable;
      }
      else if(value < 1) {
        alert("Quantity must be at least 1");
        this.quantity = 1;
      }
    }
  }

  onAddToCartClick(): void {
    this.cartSvc.setItemQuantity(this.sampleType, this.quantity);
    this.Router.navigateByUrl('/samples');
  }


}
