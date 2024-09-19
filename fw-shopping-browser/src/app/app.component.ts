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
    this.http.get(`${fwServer}samples/${100000}`)
        .pipe(map((res: any) => res.properties)).subscribe();
    
  }

  

}
