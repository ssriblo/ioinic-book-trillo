import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import {
  ModalController,
  IonRouterOutlet,
  ActionSheetController,
} from '@ionic/angular';
import { SignupPage } from '../signup/signup.page';
const { Browser, Device } = Plugins;

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalBaseComponent } from '../../components/modal-base/modal-base.component';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.page.html',
  styleUrls: ['./introduction.page.scss'],
})
export class IntroductionPage implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private actionSheetCtrl: ActionSheetController,
    private auth: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {}

  async openEmailSignup() {
    const modal = await this.modalCtrl.create({
      component: SignupPage,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true,
    });

    await modal.present();
  }

  async openSignup() {
    const buttons = [
      {
        text: 'Sign up with email',
        icon: 'mail',
        handler: () => {
          this.openEmailSignup();
        },
      },
      {
        text: 'Sign up with Google',
        icon: 'logo-google',
        handler: () => {
          this.openGoogleSignup();
        },
      }
    ];

    const device = await Device.getInfo();

    if (device.platform === 'ios') {
      buttons.push({
        text: 'Sign in with Apple',
        icon: 'logo-apple',
        handler: () => {
          this.openAppleSignup();
        },
      });
    }

    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'custom-action-sheet',
      buttons
    });
    await actionSheet.present();
  }

  openGoogleSignup() {
    this.auth.googleSignup().then((res) => {
      this.router.navigateByUrl('/app');
    }, err => {
      // Canceled the sign up
    });
  }

  openAppleSignup() {
    this.auth.appleSignin().then((res) => {
      this.router.navigateByUrl('/app');
    }, err => {
      // Canceled the sign up
    });
  }

  async openLogin() {
    const modal = await this.modalCtrl.create({
      component: ModalBaseComponent,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true,
      componentProps: {
        rootPage: LoginPage,
      },
    });

    await modal.present();
  }

  async openTerms(e) {
    e.preventDefault();
    await Browser.open({ url: 'https://devdactic.com/imprint/' });
  }

  async openPrivacy(e) {
    e.preventDefault();
    await Browser.open({ url: 'https://devdactic.com/privacy-policy/' });
  }
}
