import {Injectable} from '@angular/core';
import {LoadingController} from "@ionic/angular";
import {ToastService} from "./toast.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {ToastType} from "../enum/toast-type";

@Injectable({
  providedIn: 'root'
})
export class ToolBaringService {

  constructor(
    private loading: LoadingController,
    private toast: ToastService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  // Async function to handle user logout with loading indicator
  async logout() {
    const loading = await this.loading.create();

    // Logout using the authentication service
    this.authService.logOut().then(async () => {
      // Display loading indicator while logging out
      await loading.present();

      // Remove user UID from local storage
      localStorage.removeItem('uid');

      // Show success toast, dismiss loading, and navigate to the login page
      await this.toast.toaster("Goodbye", ToastType.SUCCESS.toString());
      await loading.dismiss();
      await this.router.navigate(['/login']);
    }).catch(reason => {
      // Show error toast if logout fails
      this.toast.toaster(reason.message, ToastType.SUCCESS.toString());
    });
  }
}
