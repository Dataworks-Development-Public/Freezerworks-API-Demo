import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { RequisitionBody } from '../requisition/requisition-body.model';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

  constructor(
    private http: HttpClient,
  ) { }


  httpCreateRequisition(requisition: RequisitionBody): Observable<any> {
    let fwServer = window.location.protocol + '//' + window.location.hostname + '/api/v1/';
    return this.http.post(`${fwServer}requisitions/`, requisition).pipe(map((res: any) => res.entities));
  }
}
