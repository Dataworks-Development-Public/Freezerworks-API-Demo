import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TileComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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

          for(let group in groupedByType) {
            this.aliquotGroups.push({
              'name': group,
              'data': groupedByType[group]
          });
          }
          
          console.log(this.aliquotGroups);

        });

        
  }

  

  createRequisition() {   
    let requisitionBody = {
      aliquots: {
        fieldName: "PK_AliquotUID",
        aliquotsRequested: ['100010', '100011', '100012', '100013', '100014', '100015', '100016', '100017', '100018', '100019', '100020', '100021']
      },
      purpose:"",
      shipToContactId: 0,
      customShipToAddress: {
        active: true,
        addressCountry: "USA",
        addressLocality: "Mountlake Terrace",
        addressPostalCode: "98???",
        addressRegion: "",
        addressStateOrProvince: "WA",
        addressStreet: "Somwhere",
        addressStreet2: "Someplace",
        cellNumber: "",
        custodian: false,
        email: "",
        faxNumber: "",
        filterString: "",
        firstName: " Me",
        freezerworksUser: true,
        fullName: "Me",
        fullNameOrganization: "  ",
        id: 0,
        lastName: "",
        organizationName: "DWD",
        protocolContact: false,
        shipOrganization: "DWD",
        shipToName: " Me",
        shippingContact: false,
        telephoneExtension: "",
        telephoneNumber: "",
        userId: 200009
      }
    };
    
    let fwServer = window.location.protocol + '//' + window.location.hostname + '/api/v1/';
    this.http.post(`${fwServer}requisitions/`, requisitionBody)
        .pipe(map((res: any) => res.entities)).subscribe();
  }

}
