import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoardAddPage } from './board-add.page';

describe('BoardAddPage', () => {
  let component: BoardAddPage;
  let fixture: ComponentFixture<BoardAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
