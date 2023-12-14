import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {ToastService} from "../../services/toast.service";
import {ToastType} from "../../enum/toast-type";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.page.html',
  styleUrls: ['./toolbar.page.scss'],
})
export class ToolbarPage {
  constructor(
    private authService: AuthenticationService,
    private toast: ToastService,
    private router: Router,
    private loading: LoadingController
  ) {}

  // Async function to handle user logout
  async logout() {
    const loading = await this.loading.create();

    this.authService.logOut().then(async () => {
      // Display loading indicator while logging out
      await loading.present();

      // Remove user UID from local storage
      localStorage.removeItem('uid');

      // Show success toaster, dismiss loading, and navigate to the login page
      await this.toast.toaster("Goodbye", ToastType.SUCCESS.toString());
      await loading.dismiss();
      await this.router.navigate(['/login']);
    }).catch(reason => {
      // Show error toaster if logout fails
      this.toast.toaster(reason.message, ToastType.SUCCESS.toString());
    });
  }
}
