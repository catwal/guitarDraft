import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallApiPage } from './call-api';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    CallApiPage,
  ],
  imports: [
    AutoCompleteModule,
    IonicPageModule.forChild(CallApiPage),
  ],
})
export class CallApiPageModule {}
