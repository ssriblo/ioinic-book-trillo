import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ResetPwPage } from '../reset-pw/reset-pw.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPw = false;
  resetPwPage = ResetPwPage;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private auth: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async signIn() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.auth
      .signIn(this.loginForm.value)
      .then(
        (res) => {
          loading.dismiss();
          this.close();
          this.router.navigateByUrl('/app');
        },
        async (err) => {
          loading.dismiss();
          const alert = await this.alertController.create({
            header: ':(',
            message: err.message,
            buttons: ['OK'],
          });

          await alert.present();
        }
      );
  }

  openGoogleSignup() {
    this.auth.googleSignup().then((res) => {      
      this.close();
      this.router.navigateByUrl('/app');
    }, err => {
      // Canceled the sign up
    });
  }

  openAppleSignup() {
    this.auth.appleSignin().then((res) => {
      this.close();
      this.router.navigateByUrl('/app');
    }, err => {
      // Canceled the sign up
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
