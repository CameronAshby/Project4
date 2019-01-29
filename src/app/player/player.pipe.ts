import {Pipe, PipeTransform} from '@angular/core';
import {Course} from '../course/course';
import {CourseService} from '../service/course.service';
import {Player} from './player';

@Pipe({
  name: 'playerFilter'
})
export class PlayerPipe implements PipeTransform {

  get courseInfo(): Course {
    return this.courseService.courseInfo;
  }

  constructor(private courseService: CourseService) {
  }

  transform(value: Player): Player {
    let duplicate = false;

    for (let i = 0; i < this.courseInfo.playerArray.length; i++) {
      for (let j = 0; j < this.courseInfo.playerArray.length; j++) {
        if (i != j && j != this.courseInfo.playerArray.length-1 && i != 0) {
          if (value[i].name == this.courseInfo.playerArray[j].name) {
            duplicate = true;
          }
          if (duplicate) {
            this.courseInfo.playerArray[i].name = value[i].name + i + '';
            duplicate = false;
          }
        }
      }
    }
    this.courseService.saveCourseInfo(this.courseInfo);
    return value;
  }
}
