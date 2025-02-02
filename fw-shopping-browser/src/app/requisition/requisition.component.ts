import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RequisitionBody } from './requisition-body.model';

import { ShoppingCartService } from '../services/shopping-cart.service';
import { RequisitionService } from '../services/requisition.service';
import { AliquotsService } from '../services/aliquots.service';
import { KeyValuePipe } from '@angular/common';
import { IconService } from '../services/icon.service';

@Component({
  selector: 'app-requisition-form',
  standalone: true,
  imports: [FormsModule, KeyValuePipe],
  templateUrl: './requisition.component.html',
  styleUrl: './requisition.component.scss'
})
export class RequisitionFormComponent implements OnInit{
  public requisition = new RequisitionBody();
  public formFields = [ // [requisition model key, field name]
    ['organizationName', 'Organization:'],
    ['fullName', 'Contact Name:'],
    ['cellNumber', 'Phone:'],
    ['addressStreet', 'Address:'],
    ['addressLocality', 'City:'],
    ['addressStateOrProvince', 'State:'],
    ['addressPostalCode', 'Postal Code:']
  ]

  constructor(
    private aliquotsSvc: AliquotsService,
    private Router: Router,
    private requisitionSvc: RequisitionService,
    public cartSvc: ShoppingCartService,
    public iconSvc: IconService
  ) { }

  ngOnInit(): void {
    if(Object.keys(this.cartSvc.cart).length) {
      this.aliquotsSvc.httpGetAvailableAliquots().subscribe((availableAliquotGroups) => {
        const requestAliquots = [];
        const cart = this.cartSvc.cart;
        // compile array of available aliquot ids to be requested
        for(let cartSampleType in cart){
          const cartItemQty = cart[cartSampleType]
          const availableAliquotGroup = availableAliquotGroups[cartSampleType];

          if(availableAliquotGroup.length >= cartItemQty){
            for(let i = 0; i < cartItemQty; i++) {
              requestAliquots.push(availableAliquotGroup[i].PK_AliquotUID);
            }
          } else {
            alert(cartItemQty + " x " + cartSampleType + " requested but only " + availableAliquotGroup.length + " are available, please adjust amount");
            this.Router.navigateByUrl('/shopping-cart');
          }
        }

        this.requisition.aliquots.aliquotsRequested = requestAliquots;
      });
    }
    else this.Router.navigateByUrl("/");
  }

  submitRequisition() {
    this.requisitionSvc.httpCreateRequisition(this.requisition).subscribe(() => {
      this.cartSvc.clearCart();
      this.aliquotsSvc.refreshAvailAliquotGroups();
      alert("Requisition submitted!");
      this.Router.navigateByUrl('/samples');
    });
  }
}