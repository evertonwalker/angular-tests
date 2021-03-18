import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionDirectiveModule } from './action-directive.module';

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
    const div: HTMLElement = fixture.nativeElement.querySelector(
      '.dummy-component'
    );
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
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

  public actionHandle(event: Event): void {
    this.event = event;
  }

  public hasEvent(): boolean {
    return !!this.event;
  }
}
