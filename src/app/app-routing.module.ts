import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {GameSetupComponent} from './game-setup/game-setup.component';
import {ScorecardComponent} from './scorecard/scorecard.component';
import {HoleDetailComponent} from './hole/hole-detail/hole-detail.component';
import {ContactComponent} from './contact/contact.component';
import {GameCompletePageComponent} from './game-complete-page/game-complete-page.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomePageComponent
  },
  {
    path: 'game-setup',
    component: GameSetupComponent
  },
  {
    path: 'score-card',
    component: ScorecardComponent,
    children: [
      {
        path: ':id',
        component: HoleDetailComponent,
      }
    ]
  },
  {
    path: 'game-results',
    component: GameCompletePageComponent
  },
  {
    path: 'contact-us',
    component: ContactComponent
  },
  {
    path: '**',
    redirectTo: 'welcome'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
