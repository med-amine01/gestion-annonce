import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private ngFireAuth: AngularFireAuth) { }

  async registerUser(email: string, password:string, fullname: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      res.user.updateProfile({displayName: fullname})
        .then(() => console.log(res.user.displayName))
        .catch((err) => console.log(err.message));
    });
  }

  async loginUser(email: string, passowrd: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, passowrd);
  }

  async resetPassword(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async logOut() {
    return await this.ngFireAuth.signOut();
  }

  async getProfile() {
    return await this.ngFireAuth.currentUser;
  }
}
