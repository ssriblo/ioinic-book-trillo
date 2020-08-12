import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetPwPage } from './reset-pw.page';

describe('ResetPwPage', () => {
  let component: ResetPwPage;
  let fixture: ComponentFixture<ResetPwPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPwPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
