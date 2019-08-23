import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeeSongPage } from './see-song';

@NgModule({
  declarations: [
    SeeSongPage,
  ],
  imports: [
    IonicPageModule.forChild(SeeSongPage),
  ],
})
export class SeeSongPageModule {}
