import { Chords } from "./chords.model";
export class SongsInfo {
  public id: string;
  public title: string;
  public authors: string;
  public chords: Chords[];
  public displayBody: string;
}
