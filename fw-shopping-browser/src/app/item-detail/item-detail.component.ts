import { Component, Input, OnInit, ɵtriggerResourceLoading } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ShoppingCartService } from '../services/shopping-cart.service';
import { AliquotsService } from '../services/aliquots.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss'
})
export class ItemDetailComponent implements OnInit{
  @Input({ required: true }) sampleType!: string;
  public qtyAvailable: number = 0;

  quantity: number = 1;

  constructor(
    private Router: Router,
    private cartSvc: ShoppingCartService,
    private aliquotSvc: AliquotsService
  ) { }

  ngOnInit(): void {
    if(this.aliquotSvc.availableAliquotGroups)
        this.qtyAvailable = this.aliquotSvc.availableAliquotGroups[this.sampleType].length
  }

  quantityChangeVerification(value: number) {
      if(value > this.qtyAvailable) {
        alert("Seleceted quantity exceeds quantity available");
        this.quantity = this.qtyAvailable;
      }
      else if(value < 1) {
        alert("Quantity must be at least 1");
        this.quantity = 1;
      }
  }

  onAddToCartClick(): void {
    // TODO: need to check if the requested QTY is actually available
    this.cartSvc.setQuantity(this.sampleType, this.quantity);
    this.Router.navigateByUrl('/samples');
  }


}
