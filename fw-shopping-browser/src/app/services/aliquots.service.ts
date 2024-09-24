import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AliquotsService {

  constructor(
    private http: HttpClient,
  ) { }

  httpGetAvailableAliquots(): Observable<any[]> {
    let fwServer = window.location.protocol + '//' + window.location.hostname + '/api/v1/';
    const aliquotGroups: any[] = [];
    
    return this.http.get(`${fwServer}aliquots?limit=0`).pipe(map((res: any) => {
      const data = res.entities;
      const groupedByType = data.reduce((groups: any, sample: any) => {
        const { Aliquot_Type, WorkflowStatus } = sample;
        if(WorkflowStatus === 'Available') {
          // Initialize the group if it doesn't exist yet
          if (!groups[Aliquot_Type]) {
            groups[Aliquot_Type] = [];
          }
          // Push the current sample into the correct group
          groups[Aliquot_Type].push(sample);
        }
        return groups;
      }, {});

      for(let group in groupedByType) {
        aliquotGroups.push({
          'name': group,
          'data': groupedByType[group]
        });
      }

      return aliquotGroups;
    }))
  }
}
