import { Component, Input } from '@angular/core';
import { Group } from '../interface';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {
  @Input() group: Group | undefined

}
