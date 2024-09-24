import { Component, OnInit } from '@angular/core';

import { RequisitionService } from '../services/requisition.service';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [],
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.scss'
})
export class MyRequestsComponent implements OnInit {
  public myRequests: any[] = [];

  constructor(
    private requisitionSvc: RequisitionService
  ) { }

  ngOnInit(): void {
    this.requisitionSvc.httpGetRequisitions().subscribe((data) => {
      let currentRequisitions = data;
      for(let requisition of currentRequisitions) {
        if(
          requisition.properties.requesterId === 200009  // if user login is added requesterId should reflect current user's id
          &&
          requisition.properties.statusId === 1  // 1 = requested, 2 = canceled
        ) {
          this.myRequests.push(requisition);
        }
      }
      console.log(this.myRequests);
    });
  }

}
