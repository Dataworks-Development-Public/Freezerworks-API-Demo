import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { requisitionDetails } from '../interface';

import { RequisitionService } from '../services/requisition.service';

@Component({
  selector: 'app-request-detail',
  standalone: true,
  imports: [],
  templateUrl: './request-detail.component.html',
  styleUrl: './request-detail.component.scss'
})
export class RequestDetailComponent implements OnInit {
  @Input({ required: true }) requestId!: number;
  public requestDetails: requisitionDetails | null = null;

  constructor(
    private Router: Router,
    private requisitionSvc: RequisitionService
  ) { }

  ngOnInit(): void { 
    this.requisitionSvc.httpGetRequisitionById(this.requestId).subscribe((data) => {
      console.log(data);
      this.requestDetails = data;
    });    
  }

}
