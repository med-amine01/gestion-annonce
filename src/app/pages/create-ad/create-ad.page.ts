import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../services/toast.service";
import {LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ToastType} from "../../enum/toast-type";
import {AdService} from "../../services/ad.service";
import {Ad} from "../../model/ad";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.page.html',
  styleUrls: ['./create-ad.page.scss'],
})
export class CreateAdPage implements OnInit {
  ionicForm: FormGroup;

  constructor(private toast: ToastService,
              private loadingController: LoadingController,
              private router: Router,
              public formBuilder: FormBuilder,
              private adService: AdService,
              private autService: AuthenticationService) {
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  getTitle() {
    return this.ionicForm?.value.title;
  }

  getSubTitle() {
    return this.ionicForm?.value.subtitle;
  }

  getDescription() {
    return this.ionicForm?.value.description;
  }

  async createAd() {
    const loading = await this.loadingController.create();
    if (this.ionicForm.valid) {

      // Creating ad object
      const ad = new Ad();
      ad.id = null;
      ad.title = this.getTitle();
      ad.subtitle = this.getSubTitle();
      ad.description =  this.getDescription();
      const currentDate = new Date();
      ad.createdAt = currentDate.toString();
      console.log(localStorage.getItem('uid'))
      // Retrieving user UID
      ad.createdBy = localStorage.getItem('uid');
      console.log(ad.toPlainObject());

      // Presisting ad in firebase
      this.adService.saveAd(ad.toPlainObject()).then((docRef) => {
        // update the ad object to new Doc id
        ad.id = docRef.id;
        this.adService.updateAd(ad.toPlainObject());
        this.toast.toaster("Ad created successfully", ToastType.SUCCESS.toString());
        this.router.navigate(['/ad']);
      }).catch(reason => {
        console.log(reason);
      });

    } else {
      await this.toast.toaster("Please provide all the required values", ToastType.DANGER.toString());
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

}
