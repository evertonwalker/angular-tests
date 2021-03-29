import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Photo } from '../interfaces/photos';

@Injectable()
export class PhotoBoardService {
  constructor(private http: HttpClient) {}

  public getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3000/photos').pipe(delay(2000));
  }
}
