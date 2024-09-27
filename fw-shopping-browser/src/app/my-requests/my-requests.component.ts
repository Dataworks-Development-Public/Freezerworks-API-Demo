import { Component, OnInit } from '@angular/core';

import { RequisitionService } from '../services/requisition.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.scss'
})
export class MyRequestsComponent implements OnInit {
  public myRequests: any[] = [];
  public requestFields = [
    ['Date requested:', 'requisitionDate'],
    ['Status:', 'statusText'],
    // ['Purpose of requisition:', 'purpose'],
    ['Aliquots requested:', 'numberOfAliquots']
  ];

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
    });
  }

}
