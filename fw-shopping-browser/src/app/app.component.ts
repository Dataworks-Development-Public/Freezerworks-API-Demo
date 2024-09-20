import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fw-shopping-browser';

  constructor(
    private router: Router, 
    private http: HttpClient
  ){  }

  clickHandler(){
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

          console.log(groupedByType);

        });
    
  }

  

}
