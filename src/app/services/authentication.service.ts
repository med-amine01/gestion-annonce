import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private ngFireAuth: AngularFireAuth) { }

  // Async function to register a new user with email, password, and full name
  async registerUser(email: string, password: string, name: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      // Update the user's profile with the provided full name
      res.user.updateProfile({ displayName: name })
        .then(() => console.log(res.user.displayName))
        .catch((err) => console.log(err.message));
    });
  }

  // Async function to log in a user with email and password
  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Async function to send a password reset email to the provided email address
  async resetPassword(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  // Async function to log out the current user
  async logOut() {
    return await this.ngFireAuth.signOut();
  }

  // Async function to get the current user's profile
  async getProfile() {
    return await this.ngFireAuth.currentUser;
  }
}
