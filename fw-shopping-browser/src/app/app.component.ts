import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { TileComponent } from './tile/tile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private router: Router, 
  ){ }  
}
