import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Aliquot } from '../interface';
import { map, Observable } from 'rxjs';

import { fwServer } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AliquotsService implements OnDestroy {
  public availableAliquotGroups: Record<string, Aliquot[]> | null = null;
  public isLoading: boolean = false;
  private timeoutId: any = null;
  private stopPolling: boolean = false;
  readonly ALIQUOT_REFRESH_INTERVAL_SECONDS: number = 30;

  constructor(private http: HttpClient) {}

  ngOnDestroy(): void {
    // end polling when component is being destroyed
    this.stopPolling = true;
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  /**
   * Triggers an immediate api call to get the available aliquots and schedules periodic refreshes of aliquots. Calling this method again while a timeout is scheduled will cancel existing timeout and schedule a new one. 
   */
  syncAvailAliquotGroups(): void {
    this.isLoading = true;
    if(this.timeoutId){
      // clear pending automatic refresh so that the existing polling cycle can be replaced by this one 
      clearTimeout(this.timeoutId);
    }

    this.httpGetAvailableAliquots().subscribe((data) => { // TODO: add error handling
      this.isLoading = false;
      this.availableAliquotGroups = data;
    })

    if(!this.stopPolling) {
      this.timeoutId = setTimeout(() => {
        this.syncAvailAliquotGroups();
      }, this.ALIQUOT_REFRESH_INTERVAL_SECONDS * 1000)
    }
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
