import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { TileComponent } from './tile/tile.component';

import { ShoppingCartService } from './services/shopping-cart.service';


export const fwServer = window.location.protocol + '//' + window.location.hostname + '/api/v1/';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    public cartSvc: ShoppingCartService
  ){ }  
}
