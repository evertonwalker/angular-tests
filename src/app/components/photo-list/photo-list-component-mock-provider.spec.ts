import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Photo } from 'src/app/shared/components/photo-board/interfaces/photos';
import { PhotoBoardMockService } from 'src/app/shared/components/photo-board/services/photo-board.mock.service';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photos';
import { PhotoListComponent } from './photo-list.component';
import { PhotoListModule } from './photo-list.module';

describe(PhotoListComponent.name + 'Mock provider', () => {

    let fixture: ComponentFixture<PhotoListComponent>;
    let component: PhotoListComponent;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [PhotoListModule, HttpClientModule],
            
            // Outra forma de fazer testes com os componentes simulando os serviços, é injetar dados no mockProviders nele 
            // no momento de importação dos testes na parte inicial do projeto.
            // O Use class usa o nosso serviço mockado para poder usar nosso serviço, para fazer as requisições.
            providers: [{
                provide: PhotoBoardService,
                useClass: PhotoBoardMockService
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(PhotoListComponent);
        component = fixture.componentInstance;
    })


    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    it('(DOM) Should display board when data arrives', () => {

        // é interessante que você sempre chame o detect, após passar datos para o serviço, pois sem isso a simulação não irá ocorrer o fluxo padrão.
        fixture.detectChanges();

        const board = fixture.nativeElement.querySelector('app-photoboard');
        const loader = fixture.nativeElement.querySelector('.loader');

        expect(board).withContext('Should display board').not.toBeNull();
        expect(loader).withContext('Should not display board').toBeNull();

    });


});