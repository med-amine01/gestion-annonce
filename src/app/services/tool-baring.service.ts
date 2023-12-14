import { Injectable } from '@angular/core';
import {AdService} from "./ad.service";
import {LoadingController} from "@ionic/angular";
import {ToastService} from "./toast.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {ToastType} from "../enum/toast-type";

@Injectable({
  providedIn: 'root'
})
export class ToolBaringService {

  constructor(private adService: AdService,
              private loading:LoadingController,
              private toast: ToastService,
              private router: Router,
              private authService: AuthenticationService) {}


  async logout() {
    const loading = await this.loading.create();
    // @ts-ignore
    this.authService.logOut().then(async value => {
      await loading.present();
      // @ts-ignore
      localStorage.removeItem('uid');
      // @ts-ignore
      this.toast.toaster("Good Bye", ToastType.SUCCESS.toString());
      loading.dismiss();
      this.router.navigate(['/login']);
    }).catch(reason => {
      // @ts-ignore
      this.toast.toaster(reason.message, ToastType.SUCCESS.toString());
    });
  }
}
