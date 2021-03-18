import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionDirective } from './action.directive';

@NgModule({
  imports: [CommonModule],
  exports: [ActionDirective],
  declarations: [ActionDirective],
})
export class ActionDirectiveModule {}
