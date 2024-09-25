import { Component, Input } from '@angular/core';
import { IconService } from '../services/icon.service';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {
  @Input({ required: true }) sampleType!: string;
  @Input({ required: true }) qtyAvailable!: number;

  constructor(public iconSvc: IconService) { }
}
