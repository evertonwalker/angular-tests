import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActionDirectiveModule } from 'src/app/shared/directives/action/action-directive.module';
import { UniquedIdService } from '../../services/unique-id/unique-id.service';
import { LikeWidgetComponent } from './like-widget.component';

@NgModule({
  declarations: [LikeWidgetComponent],
  imports: [CommonModule, FontAwesomeModule, ActionDirectiveModule],
  exports: [LikeWidgetComponent],
  providers: [UniquedIdService],
})
export class LikeWidgetModule {}
