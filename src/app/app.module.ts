import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDividerModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatSelectModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { ScorecardComponent } from './scorecard/scorecard.component';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CarouselModule, MDBBootstrapModule, WavesModule} from 'angular-bootstrap-md';
import { HoleDetailComponent } from './hole/hole-detail/hole-detail.component';
import { ContactComponent } from './contact/contact.component';
import {PlayerPipe} from './player/player.pipe';
import { GameCompletePageComponent } from './game-complete-page/game-complete-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    GameSetupComponent,
    ScorecardComponent,
    HoleDetailComponent,
    ContactComponent,
    PlayerPipe,
    GameCompletePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    FlexLayoutModule,
    MDBBootstrapModule,
    CarouselModule,
    WavesModule,
    MatDividerModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
