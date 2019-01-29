import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CourseService} from '../service/course.service';
import {Player} from '../player/player';
import {Hole} from '../hole/hole';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent implements OnInit {

  courseObject: object;
  teesObject: object;
  holesObject: object;

  courseIndex: number;

  holeArray: Hole[] = [];
  holeIndex: number = 0;

  courseName: string = '';
  courseId: number;
  haveCourseId: boolean = false;

  haveTee: boolean = false;
  teeSelection: number;

  playerCount: number;
  havePlayerCount: boolean = false;

  playerArray: Player[] = [];
  haveNames: boolean = false;

  constructor(private courseService: CourseService, private router: Router) {
  }

  ngOnInit() {
    this.getApi();
  }

  getApi() {
    this.courseService.getApi()
      .subscribe(data => this.courseObject = data[`courses`]);
  }

  getTees(id: number) {
    this.haveCourseId = true;
    this.haveTee = false;
    this.havePlayerCount = false;
    this.playerCount = undefined;
    this.teeSelection = undefined;

    this.courseService.getHoles(id)
      .subscribe(data => this.teesObject = data[`data`]['holes'][0]['teeBoxes']);
  }

  getPlayerCount(playerCount: number) {
    this.playerArray = [];
    this.havePlayerCount = true;
    this.playerCount = playerCount;

    for(let i = 0; i < playerCount; i++) {
      this.playerArray[i] = this.courseService.playerPipeArray[i] = {
        name:``,
        parScore: 0,
        inScore: 0,
        outScore: 0,
        scoreArray: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      };
    }
  }

  getTee() {
    this.haveTee = true;
  }

  getHoles(id: number) {
    this.courseService.getHoles(id)
      .subscribe(data => this.holesObject = data[`data`]['holes']);
  }

  saveCourse(course) {
    localStorage.setItem('courseObject', course.toString());
    this.courseService.saveCourseInfo(course);
  }

  displayScoreCard() {
    this.router.navigate([`score-card/${this.holeIndex}`]);
  }

  buildCourse() {
    for(let i = 0; i < 18; i++) {
      this.holeArray[i] = {
        hole: i+1,
        yards: this.holesObject[i].teeBoxes[this.teeSelection].yards,
        par: this.holesObject[i].teeBoxes[this.teeSelection].par,
        hcp: this.holesObject[i].teeBoxes[this.teeSelection].hcp,
      };
    }
    this.courseService.courseInfo = {
      name: this.courseName,
      id: this.courseId,
      teeChoice: this.teeSelection,
      holeArray: this.holeArray,
      holeIndex: this.holeIndex,
      playerArray: this.playerArray
    };

    this.saveCourse(this.courseService.courseInfo);
  }

  setId() {
    this.courseId = this.courseObject[this.courseIndex].id;
    this.courseName = this.courseObject[this.courseIndex].name;

    this.getTees(this.courseId);
    this.getHoles(this.courseId)
  }

  getNames(index) {
    if(index == this.playerCount) {
      this.haveNames = true;
    }
  }
}
