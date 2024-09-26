import { Component, OnInit, isDevMode } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { TileComponent } from './tile/tile.component';

import { ShoppingCartService } from './services/shopping-cart.service';
import { KeyValuePipe } from '@angular/common';
import { AliquotsService } from './services/aliquots.service';


export const apiBaseUrl = isDevMode() ? window.location.protocol + '//' + window.location.hostname + '/api/v1/' : '../api/v1/'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TileComponent, KeyValuePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    public cartSvc: ShoppingCartService,
    public aliquotSvc: AliquotsService
  ){ }  

  ngOnInit(): void {
    this.aliquotSvc.refreshAvailAliquotGroups();
  }
}