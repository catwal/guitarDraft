import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SongsInfo } from '../../models/songsInfos.model';

/**
 * Generated class for the SeeSongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-see-song',
  templateUrl: 'see-song.html',
})
export class SeeSongPage {
  public song: SongsInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.song = this.navParams.get("song")
console.log(this.song);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeeSongPage');
  }

}
