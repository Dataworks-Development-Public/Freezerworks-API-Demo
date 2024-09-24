import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequisitionBody } from '../requisition/requisition-body.model';
import { map, Observable } from 'rxjs';

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
