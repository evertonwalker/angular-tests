import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Photo } from '../interfaces/photos';
import { buildPhotoList } from '../test/build-photos';
import { PhotoBoardService } from './photo-board.service';

@Injectable()
export class PhotoBoardMockService extends PhotoBoardService {

    public getPhotos(): Observable<Photo[]> {
        return of(buildPhotoList());
    }

}