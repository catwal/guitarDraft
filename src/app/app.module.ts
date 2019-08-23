import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SongInfosProvider } from '../providers/song-infos/song-infos';
import { CallApiPage } from '../pages/call-api/call-api';
import { SongsAutoCompleteProvider } from '../providers/songs-auto-complete/songs-auto-complete';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SeeSongPage } from '../pages/see-song/see-song';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CallApiPage,
    SeeSongPage
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CallApiPage,
    SeeSongPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SongInfosProvider,
    SongsAutoCompleteProvider
  ]
})
export class AppModule {}
