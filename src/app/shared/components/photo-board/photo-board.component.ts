import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from './interfaces/photos';

@Component({
  selector: 'app-photoboard',
  templateUrl: './photo-board.component.html',
  styleUrls: ['./photo-board.component.scss'],
})
export class PhotoBoardComponent implements OnChanges {
  @Input() public photos: Photo[];
  public rows: any[][] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photos) {
      this.rows = this.groupColumns(changes.photos.currentValue);
    }
  }

  private groupColumns(photos: Photo[]): any[][] {
    const newRows = [];
    const step = 4;
    for (let index = 0; index < photos.length; index += step) {
      newRows.push(photos.slice(index, index + step));
    }

    return newRows;
  }
}
