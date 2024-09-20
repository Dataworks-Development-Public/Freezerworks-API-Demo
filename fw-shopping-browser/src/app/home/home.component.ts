import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  groupNames: string[] = [];
  aliquotGroups: any[] = []


  constructor(
    private http: HttpClient
  ){  }

  ngOnInit(): void {
    let fwServer = window.location.protocol + '//' + window.location.hostname + '/api/v1/';
    // this.router.navigateByUrl("home")
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

          this.groupNames = Object.keys(groupedByType);
          this.aliquotGroups = groupedByType;
          console.log(this.groupNames);
          console.log(groupedByType);

        });
  }

}
