import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionDirectiveModule } from './action-directive.module';
import { ActionDirective } from './action.directive';

describe('Action', () => {
  let fixture: ComponentFixture<ActionDirectiveTestComponent>;
  let component: ActionDirectiveTestComponent;
  //Caso o componente ou o módulo que seja testado n possua teamplate.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent],
      imports: [ActionDirectiveModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;
  });

  it('(DOM) (@Output appAction) should emit event  with payload when ENTER key is pressed', () => {
    // Existe também o debugElement, ele vem com mais recursos de busca pra encontrar elementos,
    // No caso aqui embaixo a gente procura o elemento que usa a diretiva que está assoaciado ao componente e temos que pegar o
    // nativeElement pq ele retorna um debugElement e não um nativeElement por padrão.
    const div = fixture.debugElement.query(By.directive(ActionDirective))
      .nativeElement;
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    div.dispatchEvent(event);
    expect(component.hasEvent()).toBe(true);
  });

  it('(DOM) (@Output appAction) should emit event  with payload when click is trigged', () => {
    const div: HTMLElement = fixture.nativeElement.querySelector(
      '.dummy-component'
    );
    const event = new Event('click');
    div.dispatchEvent(event);
    expect(component.hasEvent()).toBe(true);
  });
});

@Component({
  template: `
    <div class="dummy-component" (appAction)="actionHandler($event)"></div>
  `,
})
class ActionDirectiveTestComponent {
  private event: Event = null;

  public actionHandler(event: Event): void {
    this.event = event;
  }

  public hasEvent(): boolean {
    return !!this.event;
  }
}
