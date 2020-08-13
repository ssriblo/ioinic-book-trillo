import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { zip, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Board {
  name: string;
  bg: string;
  creator: string;
  members: any[];
  id: string;  
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private boardCollection: AngularFirestoreCollection<Board>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.boardCollection = this.afs.collection('boards');
  }

  addBoard(board: Board) {
    board.creator = this.authService.getUserId();
    board.members = [];
    return this.boardCollection.add(board);
  }

  getBoards() {
    const userId = this.authService.getUserId();
    return this.afs
      .collection<Board[]>('boards', (ref) => ref.where('creator', '==', userId))
      .valueChanges({ idField: 'id' });
  }
}
