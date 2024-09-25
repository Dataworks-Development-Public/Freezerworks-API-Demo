import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TileComponent } from '../tile/tile.component';

import { ShoppingCartService } from '../services/shopping-cart.service';
import { AliquotsService } from '../services/aliquots.service';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TileComponent, RouterLink, KeyValuePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    public aliquotsSvc: AliquotsService,
    public cartSvc: ShoppingCartService
  ){  }

}
