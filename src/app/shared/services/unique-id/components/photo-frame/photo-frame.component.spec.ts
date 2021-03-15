import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {

    let fixture: ComponentFixture<PhotoFrameComponent> = null;
    let component: PhotoFrameComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PhotoFrameModule]
        })

        fixture = TestBed.createComponent(PhotoFrameComponent);
        component = fixture.componentInstance;
    });

    it('Should create component', () => {
        expect(component).toBeTruthy();
    });

    // toda vez que você precisar controlar o tempo da sua função, para simular uma requisição que precisa esperar algo, 
    // você encapusla toda função com o modo fakeAsync e usa a função TICK(500) Para dizer quando tempo você quer que ele espere.
    it(`#${PhotoFrameComponent.prototype.like.name} should trigger (@OutPut liked) once when called multiple times within debounceTime`, fakeAsync(() => {
        fixture.detectChanges();
        let times = 0;
        component.liked.subscribe(() => times++);
        // Ou seja mesmo chamando duas vezes, como o tempo não foi esperado corretamente, apenas 1 click, respeitando o nosso código.
        component.like();
        component.like();
        tick(500);
        expect(times).toBe(1);
    }))

    it(`#${PhotoFrameComponent.prototype.like.name} should trigger (@Output liked) two times when called outside dobounce time`, fakeAsync(() => {
        fixture.detectChanges();
        let times = 0;
        component.liked.subscribe(() => times++);
        component.like();
        tick(500);
        component.like();
        tick(500);
        expect(times).toBe(2);
    }));

    it('(DOM) Should display number of likes when (@Input likes) is incremented', () => {
        fixture.detectChanges();
        component.likes++;
        // Se eu não usar o detectChanges novamente, eu não estou dando tempo para o dom, recarregar os dados com as atualizações
        // passadas pelo testes, então é necessário usar novamente.
        fixture.detectChanges();
        // Nativeelement = Elemento do dom que corresponde a instancia do nosso elemento.
        const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
        expect(element.textContent.trim()).toBe('1');
    });


    // Validando se o atributo do span está de acordo com o incremento -> Acessibilidade.
    it('(DOM) Should update arial-label when (@Input likes) is incremented', () => {
        fixture.detectChanges();
        component.likes++;
        fixture.detectChanges();
        const element: HTMLElement = fixture.nativeElement.querySelector('span');
        expect(element.getAttribute('aria-label')).toBe('1:pessoas curtiram ');
    });

    it('(DOM) Should have 0 value in arial-label in (@InputLikes) ', () => {
        fixture.detectChanges();
        const element: HTMLElement = fixture.nativeElement.querySelector('span');
        expect(element.getAttribute('aria-label')).toBe('0:pessoas curtiram ');
    });

    it('(DOM) Should display imagewith src and descript when bound to properties', () => {
        const description = 'some-description';
        const src = 'http://somesite.com/img.jpg';
        component.src = src;
        component.description = description;
        fixture.detectChanges();
        const img: HTMLImageElement = fixture.nativeElement.querySelector('img'); 
        expect(img.src).toBe(src);
        expect(img.alt).toBe(description);
    });
});