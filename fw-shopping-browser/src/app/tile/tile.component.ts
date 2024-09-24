import { Component, Input } from '@angular/core';

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
}
