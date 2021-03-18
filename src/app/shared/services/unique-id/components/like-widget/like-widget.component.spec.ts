import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UniquedIdService } from '../../unique-id.service';
import { LikeWidgetComponent } from './like-widget.component';
import { LikeWidgetModule } from './like-widget.module';

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent>;
  let component: LikeWidgetComponent;

  beforeEach(async () => {
    // Compile components, espera a junção entre o component + teamplate dele.
    // Também da pra fazer sem o compileCOmponents() e esse retorno de promise, porém a gente cria a dependência de que, o angular cli, precisará continuar usando o webpack, para poder
    // continuar copilando o projeto em momento de execução e não temos como viver de uma premisa, então é interessante blindar ao máximo possível.
    await TestBed.configureTestingModule({
      // Você pode importar o seu módulo ou as dependências dele separada semelhante o módulo com declarations, providers, imports..
      imports: [LikeWidgetModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  // Por padrão os ciclos de vidas do component devem ser chamados no teste, ou seja eles não são chamados automaticamentes. --> detectChanges()
  // é interessante que você não chame ele no beforeEach, porque dessa forma não dá tempo de passar atributos para o component antes dele ser chamado.
  it('Should auto generate id during NgOnit when (@Input id) is not assinged', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto-generated Id during NgOnit when (@Input Id) is assinged', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  // É interessante que quando for testar métodos assyncronos vc use o callback para validar se essa chamada foi executada.
  it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) emission when call`, (done) => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
      expect(true).toBeTrue();
      done();
    });
    component.like();
  });

  it(`#${LikeWidgetComponent.prototype.like.name} should trigger emission when call - way two with spyOn`, () => {
    // Você passa o objeto no primeiro parâmetro e no segundo qual a função que você quer ficar observando
    // Sem o spyOn esse teste iria falhar, pois não teriamos como saber sem observar o objeto na qual estamos testando seu método assincrono.
    spyOn(component.liked, 'emit'); // -> ao Fazer isso transformamos o método em um spy
    fixture.detectChanges();
    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
  });

  it(`(DOM) Should display number of likes when clicked`, (done) => {
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges();
      const counterElement: HTMLElement = fixture.nativeElement.querySelector(
        '.like-counter'
      );
      expect(counterElement.textContent.trim()).toBe('1');
      done();
    });

    const likeWidgetContainer: HTMLElement = fixture.nativeElement.querySelector(
      '.like-widget-container'
    );
    likeWidgetContainer.click();
  });

  it(`(DOM) Should display number of likes when ENTER key is pressed`, (done) => {
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges();
      const counterElement: HTMLSpanElement = fixture.nativeElement.querySelector(
        '.like-counter'
      );
      expect(counterElement.textContent.trim()).toBe('1');
      done();
    });

    const likeWidgetContainer: HTMLDivElement = fixture.nativeElement.querySelector(
      '.like-widget-container'
    );
    // Código feito para realizar teste funções utilizando o teclado, nós não possuímos métodos como click, blur nos elementos, mas eles recebem
    // dispatchEvent que isso vc pode passar um evento e com isso simular.
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    likeWidgetContainer.dispatchEvent(event);
  });
});
