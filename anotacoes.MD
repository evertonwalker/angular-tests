# Convenção de testes

Todos os arquivos que terminam com .spec, são procurados para poder testar, angular.cli ( espera por esse padrão )

# O que  o angular usa para testes
Angular usar por baixo dos panos o angular usar o jasmine  e o karma para realizar os testes do projeto, o jasmine é utilizado para a criação dos testes, métodos e funções para a escrita.
Enquanto o Karma é um test runner, um executor de testes criado pela equipe do angular bem no começo de tudo, é interessante é que o Karma é agnótisco de testes, o que quero dizer
é você pode usar ele com o MOcha, Qunit, ou qualquer outro projeto de testes que você gostar de preferência.

# Karma

Um ponto interessante é que você por ir devolvendo seus testes e ir observando em tempo real, outro ponto também é o fato dos testes dos karma,
não seguir uma ordem de execução, fazendo assim saber usar métodos como <b>beforeEach()</b> em seus trechos.

# Acessibilidade

O atributo aria-live é utilizado quando mudamos o conteúdo de algum elemento dinamicamente e queremos que o novo valor seja anunciado através de screen readers.
Já o atributo aria-atomic indica para o screen reader se ele deve anunciar apenas o conteúdo que mudou dinamicamente de uma live area ou se deve anunciar todo o conteúdo.
O atributo aria-describedby permite que o elemento seja descrito pelo elemento cujo o ID foi atribuído à propriedade

# TestBed

Pode acontecer ao testar um component nós precisarmos de injetar serviços de dependências neles e esses serviços possuirem mais dependências, então ficaremos preso em um ciclo ao tentarmos testar.
Pensando nisso a equipe do angular criou um objeto chamado TestBed que nós ajudar compilando esses componentes de forma que nós vamos conseguir testar, ela serve para criar módulos de testes nos quais
 o componente que queremos testar deve fazer parte.

# Curiosidades sobre a função IT dos testes

A função it, quando recebe um parâmetro geralmente chamado done, este parâmetro é uma referência para uma função que sinaliza para o teste que ele terminou.
É importante que o desenvolvedor chame a função done no momento em que achar adequado, caso contrário o teste nunca terminará e um erro de timeout será disparado.
É interessante usar em casos de testes assincronos: 

<code>
  it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) emission when call`, done => {
    fixture.detectChanges();
    component.liked.subscribe(() => {
      expect(true).toBeTrue();
      done();
    });
    component.like();
  });
  </code>

  # Configurando karma para: Firefox e Chrome

  É interessante que ao rodar os testes, se você tiver um ambiente robusto, você teste em mais de um browser para garantir sua eficaz, então para configurar no firefox também por exemplo é bem simples: 

  - Primeiro -> Instale a dependência do karma firefox.

  <code>npm i karma-firefox-launcher@1.3.0 -D </code> ( Significa que você só quer usar esse dependência como dEV)
  
  - Segundo, você precisa especificar que o karma vai usar essa configuração, para isso vai até o arquivo karma.conf.js e no atributo: 
   
   Adicione a library instalada:

   <code>  plugins: [ require('karma-firefox-launcher') ] </code>

    E não esqueça de especifica o browser mais embaixo: 

    <code> browsers: ['Chrome', 'Firefox'] </code>

    Feito isso seu projeto estara pronto para levantar olhando para os dois navegadores.    
    <b> MAS </b> Isso não é tão recomendado, pois o pc do usuário talvez não tenha, então ao invés de setar os navegadores no karma.conf.js diretamente, você pode, especificar através do script:

    <code> "test-common": "ng test --browsers Chrome,Firefox", </code> --> Dentro do package.json 

# Navegadores Headless

É um browser sem parte gráfica, que executa apenas em memória, no terminal, e por não ter parte gráfica é bem mais performático,
É muito comum em ambientes de CI( Continuos integration ) onde precisamos validar se tudo do projeto está ok.
O chrome já vem com o browser headless, então para executar, basta adicionar no script de test, o parÂmetro watch é importante, pois no CI, não precisa ficar observando
e sim apenas executar todos uma única vez.

 <code>"test-ci": "ng test --watch=false --browsers ChromeHeadless" </code>

 # Custom Launcher 

 Você também pode criar um browser customizado e usa-lo para executar os scripts com base em outro navegador, o que você precisa é criar a configuração dele no <i>karma.conf.js</i>
 E chama-lo no <i>package.json</i>, dessa forma: 

adicione em karma.conf.js, no final:

<code>
customLaunchers: {
      FirefoxSemCabeca: {
        base: 'Firefox', // Baseado no firefox
        flags: ['-headless'] // E quando for chamado vai passar o parâmetro para usar o modo headless
      }
} 

</code>

E no package json, você precisa apenas executar o script: <code>  "test-ci": "ng test --watch=false --browsers ChromeHeadless,FirefoxSemCabeca" </code>


