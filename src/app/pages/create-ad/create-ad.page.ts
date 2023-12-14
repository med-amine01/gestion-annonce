import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../services/toast.service";
import {Router} from "@angular/router";
import {ToastType} from "../../enum/toast-type";
import {AdService} from "../../services/ad.service";
import {Ad} from "../../model/ad";
import {ToolBaringService} from "../../services/tool-baring.service";

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.page.html',
  styleUrls: ['./create-ad.page.scss'],
})
export class CreateAdPage implements OnInit {
  ionicForm: FormGroup; // Angular Reactive Forms FormGroup for the ad creation form

  constructor(
    private toast: ToastService,
    private router: Router,
    public formBuilder: FormBuilder,
    private adService: AdService,
    protected toolBaring: ToolBaringService,
  ) {
    if (localStorage.getItem('uid') === null) {
      router.navigate(['/login']);
    }
  }

  ngOnInit() {
    // Initialize the form with validators
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['cat1', [Validators.required]]
    });
  }

  // Getter methods to retrieve form input values
  getTitle() {
    return this.ionicForm?.value.title;
  }

  getSubTitle() {
    return this.ionicForm?.value.subtitle;
  }

  getDescription() {
    return this.ionicForm?.value.description;
  }

  getCategory() {
    return this.ionicForm?.value.category;
  }

  // Async function to create a new ad
  async createAd() {
    if (this.ionicForm.valid) {
      // Creating ad object
      const ad = new Ad();
      ad.id = null;
      ad.title = this.getTitle().trim();
      ad.subtitle = this.getSubTitle().trim();
      ad.category = this.getCategory();
      ad.description = this.getDescription().trim();
      const currentDate = new Date();
      ad.createdAt = currentDate.toString();

      // Retrieving user UID
      ad.createdBy = localStorage.getItem('uid');

      // Persisting ad in Firebase
      this.adService.saveAd(ad.toPlainObject()).then((docRef) => {
        // Update the ad object to new Doc id
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
}
