import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Photo } from './interfaces/photos';
import { PhotoBoardComponent } from './photo-board.component';
import { PhotoBoardModule } from './photo-board.module';

function buildPhotoList(): Photo[] {
  const photos: Photo[] = [];

  for (let i = 0; i < 8; i++) {
    photos.push({
      id: i + 1,
      url: '',
      description: '',
    });
  }

  return photos;
}

describe(PhotoBoardComponent.name, () => {
  let fixture: ComponentFixture<PhotoBoardComponent>;
  let component: PhotoBoardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoBoardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoBoardComponent);
    component = fixture.componentInstance;
  });

  // É interessante entender que mesmo chamando o detectChanges para passar o lifecycle do angular o ngOnChange não é chamado,
  // Pois nenhuma propriedade no input dele foi passada no teamplate, então é necessário fazer isso de forma manual
  // Segue um exemplo abaixo criando um simpleChanges e passando esses valores.
  it('Should display rows and columns when (@Input photos) has values', () => {
    const photos = buildPhotoList();
    const change: SimpleChanges = {
      photos: new SimpleChange([], photos, true),
    };

    component.ngOnChanges(change);
    expect(component.rows.length).withContext('Number of rows').toBe(2);
    expect(component.rows[0].length)
      .withContext('Number of coluns for the first')
      .toBe(4);
  });
});
