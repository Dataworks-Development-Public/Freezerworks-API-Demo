import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, of } from 'rxjs';

import { fwServer } from '../app.component';
import { RequisitionBody } from '../requisition/requisition-body.model';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

  constructor(
    private http: HttpClient,
  ) { }

  httpCreateRequisition(requisition: RequisitionBody): Observable<any> {
    return this.http
      .post(`${fwServer}requisitions/`, requisition)
      .pipe(map((res: any) => res),
      catchError((error) => {
        console.error(error);
        return of(error);
      })
    );
  }

  httpGetRequisitions(): Observable<any> {
    return this.http
      .get(`${fwServer}requisitions/`)
      .pipe(map((res: any) => res.entities),
      catchError((error) => {
        console.error(error);
        return of(error);
      })
    );
  }
}
