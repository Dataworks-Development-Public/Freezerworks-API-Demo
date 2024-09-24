import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Aliquot, Group } from '../interface';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AliquotsService implements OnDestroy {
  public availableAliquotGroups: Group<Aliquot>[] = [];
  public isLoading: boolean = false;
  private timeoutId: any = null;
  private stopPolling: boolean = false;
  readonly DELAY_SECONDS: number = 5 // TODO: make this longer  (probably 30 seconds)

  constructor(private http: HttpClient) { 
    this.refreshAvailAliquotGroups();
  }

  ngOnDestroy(): void {
    this.stopPolling = true;
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  refreshAvailAliquotGroups(): void {
    this.isLoading = true;
    this.httpGetAvailableAliquots().subscribe((data) => { // TODO: add error handling
      this.isLoading = false;
      this.availableAliquotGroups = data;
    })

    if(!this.stopPolling) {
      this.timeoutId = setTimeout(() => {
        this.refreshAvailAliquotGroups();
      }, this.DELAY_SECONDS * 1000)
    }
  }

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
