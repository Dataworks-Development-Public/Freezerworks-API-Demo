import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RequisitionBody } from './requisition-body.model';

import { ShoppingCartService } from '../services/shopping-cart.service';
import { RequisitionService } from '../services/requisition.service';
import { AliquotsService } from '../services/aliquots.service';

@Component({
  selector: 'app-requisition-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './requisition.component.html',
  styleUrl: './requisition.component.scss'
})
export class RequisitionFormComponent implements OnInit{
  public requisition = new RequisitionBody();

  constructor(
    public cartSvc: ShoppingCartService,
    public requisitionSvc: RequisitionService,
    private aliquotsSvc: AliquotsService,
    private Router: Router
  ) { }

  ngOnInit(): void {
    this.aliquotsSvc.httpGetAvailableAliquots().subscribe((data) => {
      let availableAliquots = data;
      const requestAliquots = [];
      // compile array of available aliquot ids to be requested
      for(let group of availableAliquots) {
        for(let item of this.cartSvc.cart) {
          if(group.name === item.itemName) {
            if(group.data.length > item.itemQty) 
              for(let i=0; i<item.itemQty; i++) 
                requestAliquots.push(group.data[i].PK_AliquotUID);
            else {
              alert(item.itemQty + " x " + item.itemName + " requested but only " + group.data.length + " are available, please adjust amount");
              this.Router.navigateByUrl('/shopping-cart');
            }
          }
        }
      }

      this.requisition.aliquots.aliquotsRequested = requestAliquots;
    });
  }

  submitRequisition() {
    this.requisitionSvc.httpCreateRequisition(this.requisition).subscribe(() => {
      this.cartSvc.clearCart();
      this.Router.navigateByUrl('/samples');
    });
  }
}
