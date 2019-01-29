import { Component, OnInit } from '@angular/core';
import {CourseService} from '../service/course.service';
import {Course} from '../course/course';
import {Router} from '@angular/router';
import {ScoreService} from '../service/score.service';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css']
})
export class ScorecardComponent implements OnInit {

  get courseInfo(): Course {
    return this.courseService.courseInfo;
  }

  showCard: boolean = false;
  showInfoCard: boolean = false;

  yardTotal: number = 0;
  parTotal: number = 0;

  displayedColumns: string[] = ['Hole', 'Yards', 'Par', 'Hcp'];
  displayedColumnsTwo: string[] = ['Name', 'outScore', 'inScore', 'ParScore'];

  constructor(private courseService : CourseService, private router: Router, private scoring: ScoreService) { }

  ngOnInit() {
    if(this.courseService.courseInfo == undefined) {
      this.courseService.setCourseInfo().subscribe(data => {
        this.courseService.courseInfo = data
      });
    }
    for(let i = 0; i < this.courseService.courseInfo.holeArray.length; i++) {
      this.yardTotal += this.courseService.courseInfo.holeArray[i].yards;
    }
    for(let i = 0; i < this.courseService.courseInfo.holeArray.length; i++) {
      this.parTotal += this.courseService.courseInfo.holeArray[i].par;
    }
  }

  toggleScorecard() {
    this.showCard = !this.showCard;
  }

  toggleHoleInfo() {
    this.showInfoCard = !this.showInfoCard;
  }

  backHole() {
    if(this.courseInfo.holeIndex != 0) {
      this.router.navigate([`score-card/${this.courseInfo.holeIndex-1}`]);
      this.courseInfo.holeIndex -= 1;
    }
    this.courseService.saveCourseInfo(this.courseInfo);
  }

  forwardHole() {
    if(this.courseInfo.holeIndex != 17) {
      this.router.navigate([`score-card/${this.courseInfo.holeIndex+1}`]);
      this.courseInfo.holeIndex += 1;
    }
    this.courseService.saveCourseInfo(this.courseInfo);
  }

  gameCompletePage() {
    this.router.navigate(['game-results']);
  }
}
