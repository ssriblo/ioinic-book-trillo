import { ModalBaseComponent } from './../../components/modal-base/modal-base.component';
import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { BoardAddPage } from '../board-add/board-add.page';
import { BoardService } from '../../services/board.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.page.html',
  styleUrls: ['./boards.page.scss'],
})
export class BoardsPage implements OnInit {
  boards: Observable<any>;

  constructor(
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private boardService: BoardService
  ) {}

  ngOnInit() {
    this.boards = this.boardService.getBoards();
  }

  async add() {
    const modal = await this.modalCtrl.create({
      component: ModalBaseComponent,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true,
      componentProps: {
        rootPage: BoardAddPage,
      },
    });

    modal.onDidDismiss().then((res: any) => {
      if (res.data && res.data.board) {
        this.boardService.addBoard(res.data.board);
      }
    });

    await modal.present();
  }

}
