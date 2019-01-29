import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../service/course.service';
import {Course} from '../../course/course';
import {ScoreService} from '../../service/score.service';

@Component({
  selector: 'app-hole-detail',
  templateUrl: './hole-detail.component.html',
  styleUrls: ['./hole-detail.component.css']
})
export class HoleDetailComponent implements OnInit {

  get courseInfo(): Course {
    return this.courseService.courseInfo;
  }

  constructor(private courseService: CourseService, private scoring: ScoreService) { }

  ngOnInit() {
    if(this.courseInfo == undefined) {
      this.courseService.setCourseInfo().subscribe(data => {
        this.courseService.courseInfo = data
      });
    }
  }

  updateScores(playerIndex: number, holeIndex: number) {
    this.scoring.haveScore[holeIndex] = false;
    this.courseInfo.playerArray[playerIndex].parScore = 0;

    for(let hole of this.courseInfo.playerArray[playerIndex].scoreArray) {
      this.courseInfo.playerArray[playerIndex].parScore += hole;
    }

    if(this.courseInfo.holeIndex <= 8) {
      this.courseInfo.playerArray[playerIndex].outScore = 0;
      for(let hole of this.courseInfo.playerArray[playerIndex].scoreArray) {
        this.courseInfo.playerArray[playerIndex].outScore += hole;

        if(hole > 0) {
          this.scoring.haveScore[holeIndex] = true;
        }
      }
    }
    else {
      let inScoreArray = [];
      for(let i = 0; i < this.courseInfo.holeArray.length / 2; i++){
        inScoreArray[i] = this.courseInfo.playerArray[playerIndex].scoreArray[i+9];
      }
      this.courseInfo.playerArray[playerIndex].inScore = 0;
      for(let hole of inScoreArray) {
        if(hole) {
          this.courseInfo.playerArray[playerIndex].inScore += hole;

          if(hole > 0) {
            this.scoring.haveScore[holeIndex] = true;
          }
        }
      }
    }

    // if(playerIndex == this.courseInfo.playerArray.length-1) {
    //   this.scoring.haveScore[holeIndex] = true;
    // }
  }

  updateFireBase() {
    this.courseService.saveCourseInfo(this.courseInfo);
  }
}
