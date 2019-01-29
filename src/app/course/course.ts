import {Hole} from '../hole/hole';
import {Player} from '../player/player';

export interface Course {
  name: string;
  id: number;
  teeChoice: number;
  holeArray: Hole[];
  holeIndex: number;
  playerArray: Player[];
}
