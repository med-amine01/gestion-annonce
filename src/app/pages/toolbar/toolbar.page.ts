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
  constructor(private authService: AuthenticationService,
              private toast: ToastService,
              private router: Router,
              private loading: LoadingController) { }

  async logout() {
    const loading = await this.loading.create();
    this.authService.logOut().then(async value => {
      await loading.present();
      localStorage.removeItem('uid');
      this.toast.toaster("Good Bye", ToastType.SUCCESS.toString());
      loading.dismiss();
      this.router.navigate(['/login']);
    }).catch(reason => {
      this.toast.toaster(reason.message, ToastType.SUCCESS.toString());
    });
  }
}
