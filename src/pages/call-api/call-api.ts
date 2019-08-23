import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SongInfosProvider } from "../../providers/song-infos/song-infos";
import { SongsAutoCompleteProvider } from "../../providers/songs-auto-complete/songs-auto-complete";
import { AutoCompleteComponent } from "ionic2-auto-complete";
import { FormGroup, FormBuilder } from "@angular/forms";
import { SongsInfo } from "../../models/songsInfos.model";
import { SeeSongPage } from "../see-song/see-song";

/**
 * Generated class for the CallApiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-call-api",
  templateUrl: "call-api.html"
})
export class CallApiPage {
  /* @ViewChild('songsAutoComplete')
songsAutoComplete: AutoCompleteComponent */
  public songData: FormGroup;
  public searchSongList: Array<SongsInfo>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private songInfosProvider: SongInfosProvider,
    public songsAutoComp: SongsAutoCompleteProvider,
    public formBuilder: FormBuilder
  ) {
    /*  this.songInfosProvider.getSearch('jolene').then((data)=>{
      console.log(data);

    }); */
    this.songData = this.formBuilder.group({
      song: [""]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CallApiPage");
  }

  onSubmit() {
    if (this.songData != null) {
      this.searchSongList = new Array<SongsInfo>();
      console.log(this.songData.value["song"]);
      this.songInfosProvider
        .getSearch(this.songData.value["song"])
        .then(data => {
          console.log(data);
          this.searchSongList = data;
        });
      this.songData.reset();
    }
  }

  selecteSong(song: SongsInfo) {
    console.log(song);
    this.navCtrl.push(SeeSongPage, { song: song });
    this.searchSongList.length = 0;
  }
}
