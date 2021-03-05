import { UniquedIdService } from "./unique-id.service";



// É interessante colocar nome do artefato que queremos testar, é interessante usar o name da classe pois se você alterar o nome dela
// ainda assim o teste saberá apontar para o nome correto.
describe(UniquedIdService.name, () => {

  // É interessante o nome do método ou comportamento que queremos testar: blablabla should blablabla when blablabla..
  it(`#${UniquedIdService.prototype.generateUniqueIdWithPrefix.name} should generate id when called with prefi`, () => {

    const service = new UniquedIdService();
    const id = service.generateUniqueIdWithPrefix('app');
    expect(id).toContain('app-');

  });

  it('Segunda condição', () => {

  });
});
