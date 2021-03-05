# Convenção de testes

Todos os arquivos que terminam com .spec, são procurados para poder testar, angular.cli ( espera por esse padrão )

# O que  o angular usa para testes
Angular usar por baixo dos panos o angular usar o jasmine  e o karma para realizar os testes do projeto, o jasmine é utilizado para a criação dos testes, métodos e funções para a escrita.
Enquanto o Karma é um test runner, um executor de testes criado pela equipe do angular bem no começo de tudo, é interessante é que o Karma é agnótisco de testes, o que quero dizer
é você pode usar ele com o MOcha, Qunit, ou qualquer outro projeto de testes que você gostar de preferência.

# Karma

Um ponto interessante é que você por ir devolvendo seus testes e ir observando em tempo real, outro ponto também é o fato dos testes dos karma,
não seguir uma ordem de execução, fazendo assim saber usar métodos como <b>beforeEach()</b> em seus trechos.
