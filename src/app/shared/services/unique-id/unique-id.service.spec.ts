import { UniquedIdService } from './unique-id.service';

// É interessante colocar nome do artefato que queremos testar, é interessante usar o name da classe pois se você alterar o nome dela
// ainda assim o teste saberá apontar para o nome correto.
describe(UniquedIdService.name, () => {
  let service: UniquedIdService = null;

  // Tem o papel de garantir que em cada it, terá uma nova instancia de dados, nesse caso o serviço sempre é resetado para os valores
  // não irem acumulando ao decorrer dos testes e ocasionar em pequenas falhas.
  beforeEach(() => {
    service = new UniquedIdService();
  });

  // É interessante o nome do método ou comportamento que queremos testar: blablabla should blablabla when blablabla..
  it(`#${UniquedIdService.prototype.generateUniqueIdWithPrefix.name} should generate id when called with prefi`, () => {
    const id = service.generateUniqueIdWithPrefix('app');

    expect(id.startsWith('app-')).toBeTrue();

    // É feito para comparar tipos primitivos, em outras palavras valores literais.
    // expect(new Boolean(true)).toBeTrue(); -> false

    // É feito comparação no valor literal, mas se for comparado objeto sempre vai da diferentes, pois vai olhar pra instancia na memória.
    //  expect(true).toBe(true);

    // É o mais genêrico de todos, ele segue as regras do javascript para verificar semelhante ao if, etc..
    // expect(true).toBeTruthy();
  });

  it(`#${UniquedIdService.prototype.generateUniqueIdWithPrefix.name} should not duplicated when called multiple times`, () => {
    const ids = new Set();

    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }

    expect(ids.size).toBe(50);
  });

  it(`#${UniquedIdService.prototype.getNumberOfGereneratedUniqueIds.name} should return the number of generated ids when called `, () => {
    const idFirst = service.generateUniqueIdWithPrefix('app');
    const idSecond = service.generateUniqueIdWithPrefix('app');

    const quantifyIds = service.getNumberOfGereneratedUniqueIds();

    expect(quantifyIds).toBe(2);
  });

  it(`#${UniquedIdService.prototype.getNumberOfGereneratedUniqueIds.name} should throw exception when called with empty `, () => {
    const emptyValues = ['', null, undefined, '0', '1'];

    emptyValues.forEach((emptyValue) => {
      // Quando o método for testar o toThrow() necessita que o método a ser chamado seja embrulhado por uma função.
      // Outra coisa interessante é quando for executar testes com forEach, use o withContext para identificar qual deles falhou.
      expect(() => service.generateUniqueIdWithPrefix(emptyValue))
        .withContext(`Empty value wrong --> ${emptyValue}`)
        .toThrow();
    });
  });
});
