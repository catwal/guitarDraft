import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SongsInfo } from "../../models/songsInfos.model";
import { Chords } from "../../models/chords.model";
import { AutoCompleteService } from "ionic2-auto-complete";

/*
  Generated class for the SongInfosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SongInfosProvider {
  private apiKey = "40ff72df7bfd0de2adc35b5624e3b07c37e4feb2";
  private urlStatic = "http://api.guitarparty.com/v2/songs/?query=";

  public songsSearch = Array<SongsInfo>();
  public chordsSong = Array<Chords>();
  // public chordsSong = [];

  private httpHeaders = {
    headers: new HttpHeaders({
      "Guitarparty-Api-Key": this.apiKey
    })
  };

  constructor(public http: HttpClient) {
    console.log("Hello SongInfosProvider Provider");
  }

  getSearch(val: string): Promise<any> {
    return new Promise(resolve => {
      console.log(val);
      this.songsSearch = new Array<SongsInfo>();
      this.http.get(this.urlStatic + val, this.httpHeaders).subscribe(
        data => {
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

                element.chords.forEach(chord => {
                  let chordsInfos: Chords = new Chords();
                  console.log(chord);
                  chordsInfos.id = chord.uri;
                  chordsInfos.name = chord.name;
                  chordsInfos.code = chord.code;
                  chordsInfos.image = chord.image_url;
                  this.chordsSong.push(chordsInfos);
                });

                songData.chords = this.chordsSong;
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
          resolve(this.songsSearch);
        },
        error => {
          console.log(error);
        }
      );
    });
  }
}
