import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';

import { TileComponent } from './tile/tile.component';

import { ShoppingCartService } from './services/shopping-cart.service';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TileComponent, KeyValuePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    public cartSvc: ShoppingCartService,
    private router: Router, 
  ){ }  
}
