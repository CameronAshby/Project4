import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from '../player/player';
import {AngularFireDatabase, AngularFireObject, SnapshotAction} from '@angular/fire/database';
import {Course} from '../course/course';
import {map} from 'rxjs/operators';
import {Hole} from '../hole/hole';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseInfo: Course;
  playerPipeArray: Player[] = [];

  private apiUrl = 'https://golf-courses-api.herokuapp.com/courses';

  private playerRef: AngularFireObject<Player[]>;
  private courseRef: AngularFireObject<Course>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.playerRef = this.db.object<Player[]>('game/players');
    this.courseRef = this.db.object<Course>('game/course');
  }

  getApi(): Observable<object> {
    return this.http.get<object>(this.apiUrl);
  }

  getHoles(id: number): Observable<object> {
    return this.http.get<object>(this.apiUrl + `/${id}`);
  }

  saveCourseInfo(course: Course) {
    this.courseRef.set(course);
  }

  setCourseInfo() {
    return this.courseRef.snapshotChanges()
      .pipe(
        map((item: SnapshotAction<Course>): Course => {
          return {
            name: item.payload.val().name,
            id: item.payload.val().id,
            teeChoice: item.payload.val().teeChoice,
            holeArray: item.payload.val().holeArray,
            holeIndex: item.payload.val().holeIndex,
            playerArray: item.payload.val().playerArray
        } as Course;
        })
      );
  }
}
