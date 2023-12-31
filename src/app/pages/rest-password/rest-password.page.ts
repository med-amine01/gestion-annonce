import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {ToastService} from '../../services/toast.service';
import {ToastType} from '../../enum/toast-type';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.page.html',
  styleUrls: ['./rest-password.page.scss'],
})
export class RestPasswordPage {
  email: string; // Variable to store the user's email for password reset

  constructor(
    private authService: AuthenticationService,
    private toastService: ToastService,
    private router: Router
  ) {}

  // Method to initiate the password reset process
  async resetPassword() {
    this.authService.resetPassword(this.email).then(() => {
      // Show success toaster and navigate to the login page
      this.toastService.toaster(
        'Your reset password link has been sent to your email',
        ToastType.SUCCESS.toString()
      );
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error.message);
      // Show error toaster if password reset fails
      this.toastService.toaster("Couldn't reset password", ToastType.DANGER.toString());
    });
  }
}
