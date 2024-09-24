import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TileComponent } from '../tile/tile.component';

import { ShoppingCartService } from '../services/shopping-cart.service';
import { AliquotsService } from '../services/aliquots.service';

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
    private aliquotsSvc: AliquotsService,
    public cartSvc: ShoppingCartService
  ){  }

  ngOnInit(): void {
      this.aliquotsSvc.httpGetAvailableAliquots().subscribe((data) => {
        this.aliquotGroups = data;
      })
  }
}
