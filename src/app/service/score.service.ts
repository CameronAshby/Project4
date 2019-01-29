import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  haveScore: boolean[] = [];

  constructor() { }
}
