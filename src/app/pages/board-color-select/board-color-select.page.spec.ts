import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoardColorSelectPage } from './board-color-select.page';

describe('BoardColorSelectPage', () => {
  let component: BoardColorSelectPage;
  let fixture: ComponentFixture<BoardColorSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardColorSelectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardColorSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
