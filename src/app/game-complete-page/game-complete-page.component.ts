import { Component, OnInit } from '@angular/core';
import {CourseService} from '../service/course.service';
import {Course} from '../course/course';

@Component({
  selector: 'app-game-complete-page',
  templateUrl: './game-complete-page.component.html',
  styleUrls: ['./game-complete-page.component.css']
})
export class GameCompletePageComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'outScore', 'inScore', 'ParScore'];

  parTotalArray: Array<number> = [];
  parTotal: number;
  checkScoreArray: Array<number> = [];

  playerMessageArray: Array<string> = [];

  get courseInfo(): Course {
    return this.courseService.courseInfo;
  }

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.setParTotal();
    for(let i = 0; i < this.courseInfo.playerArray.length; i++) {
      this.parTotalArray[i] = this.setPlayerParTotal(i);
      this.playerMessageArray[i] = this.setPlayerScoreMessage(this.courseInfo.playerArray[i].parScore, i);
    }
  }

  setParTotal() {
    let parTotal = 0;
    for(let i = 0; i < this.courseInfo.holeArray.length; i++) {
      parTotal += this.courseInfo.holeArray[i].par;
    }

    this.parTotal = parTotal;
  }

  setPlayerParTotal(playerIndex: number) {
    let playerParTotal = 0;
    for(let i = 0; i < this.courseInfo.playerArray[playerIndex].scoreArray.length; i++) {
      playerParTotal += this.courseInfo.playerArray[playerIndex].scoreArray[i];
    }
    return playerParTotal;
  }

  setPlayerScoreMessage(parScore: number, playerIndex: number): string {
    this.checkScoreArray[playerIndex] = parScore - this.parTotal;

    if(this.checkScoreArray[playerIndex] < 0) {
      return 'Great Job! You Were Below Par!';
    }
    else {
      return 'Maybe Next Time! You Were Over Par';
    }
  }
}
