import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { RequisitionBody } from './requisition-body.model';
import { RequisitionService } from '../services/requisition.service';
import { AliquotsService } from '../services/aliquots.service';
import { Router } from '@angular/router';

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
    this.aliquotsSvc.httpGetAliquots().subscribe((data) => {
      let availableAliquots = data;
      const requestAliquots = [];
      // compile array of available aliquot ids to be requested
      for(let group of availableAliquots) {
        for(let item of this.cartSvc.cart) {
          if(group.name === item.itemName) {
            for(let i=0; i<item.itemQty; i++) {
              requestAliquots.push(group.data[i].PK_AliquotUID) // TODO: need to check if the requested QTY is actually available
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
