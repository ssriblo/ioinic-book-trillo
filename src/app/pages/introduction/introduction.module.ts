import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroductionPageRoutingModule } from './introduction-routing.module';

import { IntroductionPage } from './introduction.page';
import { SignupPageModule } from '../signup/signup.module';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { LoginPageModule } from '../login/login.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroductionPageRoutingModule,
    SignupPageModule,
    SharedComponentsModule,  // <- Add it here!,
    LoginPageModule
  ],
  declarations: [IntroductionPage]
})
export class IntroductionPageModule {}
