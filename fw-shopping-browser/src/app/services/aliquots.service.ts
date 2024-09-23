import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AliquotsService {
  private aliquotGroups: any[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  httpGetAliquots(): any[] {
    let fwServer = window.location.protocol + '//' + window.location.hostname + '/api/v1/';
    
    this.http.get(`${fwServer}aliquots?limit=0`)
        .pipe(map((res: any) => res.entities)).subscribe((data) => {
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
            this.aliquotGroups.push({
              'name': group,
              'data': groupedByType[group]
            });
          }

        }); 
        
        return this.aliquotGroups
  }
}
