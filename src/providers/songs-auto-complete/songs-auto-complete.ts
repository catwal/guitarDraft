import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AutoCompleteService } from "ionic2-auto-complete";
import { SongInfosProvider } from "../song-infos/song-infos";
import { SongsInfo } from "../../models/songsInfos.model";
import { Chords } from "../../models/chords.model";
import "rxjs/add/operator/map";

/*
  Generated class for the SongsAutoCompleteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SongsAutoCompleteProvider implements AutoCompleteService {
  private searchSong: any;

  private apiKey = "40ff72df7bfd0de2adc35b5624e3b07c37e4feb2";
  private urlStatic = "http://api.guitarparty.com/v2/songs/?query=";

  public songsSearch = Array<SongsInfo>();
  public chordsSong = Array<Chords>();

  private httpHeaders = {
    headers: new HttpHeaders({
      "Guitarparty-Api-Key": this.apiKey
    })
  };

  constructor(
    public http: HttpClient,
    private songInfosProvider: SongInfosProvider
  ) {
    console.log("Hello SongsAutoCompleteProvider Provider");
    /*  this.songInfosProvider.getSearch('jolene').then((data)=>{
      console.log(data);
      this.searchSong = data
    }); */
  }

  getResults(val: string) {
    if (val !== undefined && val.length >= 3) {
      this.http.get(this.urlStatic + val, this.httpHeaders).map(data => {
        // console.log(data);
        const result = Object.keys(data).map(i => data[i]);
        console.log(result);
        result.forEach(song => {
          console.log(song);
          if (typeof song !== "number") {
            song.forEach(element => {
              var songData: SongsInfo = new SongsInfo();
              /**
               * Gestion chords
               */
              this.chordsSong = new Array<Chords>();
              let chordsInfos: Chords = new Chords();
              element.chords.forEach(element => {
                //  console.log(element);
                chordsInfos.id = element.uri;
                chordsInfos.name = element.name;
                chordsInfos.code = element.code;
                chordsInfos.image = element.image_url;
                this.chordsSong.push(chordsInfos);
                songData.chords = this.chordsSong;
              });
              /**
               * Gestion autheurs
               */
              // console.log(element);
              if (element.authors.length >= 1) {
                // console.log(element.authors.length);
                var longueur = element.authors.length;
                var str = "";
                for (var i = 0; i <= longueur; i++) {
                  if (element.authors[i] !== undefined) {
                    str += " de " + element.authors[i].name + ", ";
                    // console.log(element.authors[i].name);
                    // console.log(str);
                    songData.authors = str;
                  }
                }
              }
              songData.id = element.id;
              songData.title = element.title;
              songData.displayBody = element.body_chords_html;
              console.log(songData);
              this.songsSearch.push(songData);
            });
          }
        });
        console.log(this.songsSearch);
        return this.songsSearch["title"];
      });
    }
  }

  getItemLabel?(item: any) {
    return item.title;
  }
}
