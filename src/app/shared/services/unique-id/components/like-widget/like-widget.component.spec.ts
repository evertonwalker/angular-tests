import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UniquedIdService } from '../../unique-id.service';
import { LikeWidgetComponent } from './like-widget.component';
import { LikeWidgetModule } from './like-widget.module';

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent>;

  beforeEach( async () => {

    // Compile components, espera a junção entre o component + teamplate dele.
    // Também da pra fazer sem o compileCOmponents() e esse retorno de promise, porém a gente cria a dependência de que, o angular cli, precisará continuar usando o webpack, para poder
    // continuar copilando o projeto em momento de execução e não temos como viver de uma premisa, então é interessante blindar ao máximo possível.
    await TestBed.configureTestingModule({
      // Você pode importar o seu módulo ou as dependências dele separada semelhante o módulo com declarations, providers, imports..
      imports: [ LikeWidgetModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);

  });

  it('Should create component', () => {
    const instance = fixture.componentInstance;
    expect(instance).toBeTruthy();
  });
});
