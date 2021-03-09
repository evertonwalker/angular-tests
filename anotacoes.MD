# Convenção de testes

Todos os arquivos que terminam com .spec, são procurados para poder testar, angular.cli ( espera por esse padrão )

# O que  o angular usa para testes
Angular usar por baixo dos panos o angular usar o jasmine  e o karma para realizar os testes do projeto, o jasmine é utilizado para a criação dos testes, métodos e funções para a escrita.
Enquanto o Karma é um test runner, um executor de testes criado pela equipe do angular bem no começo de tudo, é interessante é que o Karma é agnótisco de testes, o que quero dizer
é você pode usar ele com o MOcha, Qunit, ou qualquer outro projeto de testes que você gostar de preferência.

# Karma

Um ponto interessante é que você por ir devolvendo seus testes e ir observando em tempo real, outro ponto também é o fato dos testes dos karma,
não seguir uma ordem de execução, fazendo assim saber usar métodos como <b>beforeEach()</b> em seus trechos.

# acessibilidade

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
