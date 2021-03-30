import { TestBed } from '@angular/core/testing';
import { PhotoBoardService } from './photo-board.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// A URL TEM QUE SER IDÊNTICA AO DO SERVIÇO QUE VAI SER TESTADO NO MÉTODO SERVICE.
const mockData = {
    api: 'http://localhost:3000/photos',
    data: [
        {
            id: 1,
            description: 'example 1',
            src: ''
        },
        {
            id: 2,
            description: 'example 2',
            src: ''
        }
    ]
}

describe(PhotoBoardService.name, () => {

    let service: PhotoBoardService;
    let httpController: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PhotoBoardService]
        });

        service = TestBed.inject(PhotoBoardService);
        httpController = TestBed.inject(HttpTestingController);

    });

    // é interessante pq ele serve pra verificar se nenhuma das requisições que a gente fez,
    // não deixamos de usar o httpController.expectOne, ele nós blinda avisando onde poderiamos ter falhado caso,
    // tenha uma requisição sem controller.
    afterEach(() => {
        httpController.verify();
    })

    it(`#${PhotoBoardService.prototype.getPhotos.name} should return photos with description in upperCase`, done => {

        service.getPhotos()
            .subscribe(photos => {
                expect(photos[0].description).toBe('EXAMPLE 1');
                expect(photos[1].description).toBe('EXAMPLE 2');
                done();
            });

        // PRIMEIRO PONTO, É OBRIGATÓRIO QUE AO TESTAR O HTTPCONTROLER, VOCÊ SEMPRE DEIXE A REQUISIÇÃO, DEPOIS DO SUBSCRIBE, PQ ELE QUE DISPARA O MÉTODO ANTERIOR COM O SUBSCRIBE.
        // Esse exemplo de baixo simula uma requisição ao serviço, onde ele usa o expectOne esperando uma url para fazer a requisição para determinado método 
        // E o flush, será o dado que será retornado para o uso do teste, isso é interessante para testar preparações de dados HttpClient, antes de chegar
        // No componente.

        httpController.expectOne(mockData.api)
            .flush(mockData.data);


    });


});