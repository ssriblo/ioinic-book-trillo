import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Plugins } from '@capacitor/core';
const { SignInWithApple } = Plugins;
import '@codetrix-studio/capacitor-google-auth';

import { auth } from 'firebase/app';
import 'firebase/auth';

import { AlertController } from '@ionic/angular';

import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private alertController: AlertController,
    private storage: AngularFireStorage
  ) {}

  // Start the Firebase register process
  async emailSignup({ email, password, fullname }): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    return this.updateUserData(credential.user, fullname);
  }

  // Sets user data to firestore on login
  private updateUserData(user: User, name = null, image = null): Promise<any> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      photoURL: image,
    };

    if (!data.displayName) {
      delete data.displayName;
    }

    if (!data.photoURL) {
      delete data.photoURL;
    }

    return userRef.set(data, { merge: true });
  }

  // Sign up with Google
  async googleSignup() {
    // const googleUser = await Plugins.GoogleAuth.signIn();

    // const credential = auth.GoogleAuthProvider.credential(
    //   googleUser.authentication.idToken
    // );

    // const afUser = await this.afAuth.signInWithCredential(credential);

    // return this.updateUserData(
    //   afUser.user,
    //   googleUser.givenName,
    //   googleUser.imageUrl
    // );
  }

  async appleSignin() {
    return SignInWithApple.Authorize()
      .then(async (res) => {
        if (res.response && res.response.identityToken) {
          // this.auth.createFirebaseuser(res.response);
          const appleResponse = res.response;

          // Create a custom OAuth provider
          const provider = new auth.OAuthProvider('apple.com');

          // Create sign in credentials with our token
          const credential = provider.credential({
            idToken: appleResponse.identityToken,
          });

          // Call the sign in with our created credentials
          const afUser = await this.afAuth.signInWithCredential(credential);

          let name = '';
          if (appleResponse.givenName && appleResponse.familyName) {
            name = `${appleResponse.givenName} ${appleResponse.familyName}`;
          }
          // Update the user document in Firestore
          return this.updateUserData(afUser.user, name);
        } else {
          this.presentAlert('Error', `Couldn't sign in with Apple!`);
        }
      })
      .catch((err) => {
        // no permission was given
      });
  }

  signIn({ email, password }) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  resetPw(email) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // User functions
  getUserId() {
    return auth().currentUser.uid;
  }

  getUserData() {
    return this.afs.doc<User>(`users/${this.getUserId()}`).valueChanges();
  }

  uploadAvatar(base64String) {
    const filePath = `${this.getUserId()}/avatar`;
    const fileRef = this.storage.ref(filePath);
    const task: AngularFireUploadTask = fileRef.putString(
      base64String,
      'base64',
      { contentType: 'image/png' }
    );

    return from(task).pipe(
      switchMap((result) => {
        // Upload Task finished, get URL to the image
        return fileRef.getDownloadURL();
      }),
      switchMap((photoURL) => {
        // Set the URL to the user document
        const uploadPromise = this.afs
          .doc(`users/${this.getUserId()}`)
          .set({ photoURL }, { merge: true });
        return from(uploadPromise);
      })
    );
  }
}