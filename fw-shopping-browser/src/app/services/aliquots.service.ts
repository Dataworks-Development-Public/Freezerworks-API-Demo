import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Aliquot } from '../interface';
import { map, Observable } from 'rxjs';

import { fwServer } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AliquotsService {
  public availableAliquotGroups: Record<string, Aliquot[]> | null = null;
  public isLoading: boolean = false;
  
  constructor(private http: HttpClient) {}

  refreshAvailAliquotGroups(): void {
    this.isLoading = true;
    
    this.httpGetAvailableAliquots().subscribe((data) => {
      this.isLoading = false;
      this.availableAliquotGroups = data;
    })
  }

  /**
   * Returns available aliquots separated into groups by Aliquot_Type
   */
  httpGetAvailableAliquots(): Observable<Record<string, Aliquot[]>> {
    return this.http.get(`${fwServer}aliquots?limit=0`).pipe(map((res: any) => {
      const data = res.entities;
      const groupedByType = data.reduce((groups: Record<string, Aliquot[]>, sample: Aliquot) => {
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

      return groupedByType;
    }))
  }
}
