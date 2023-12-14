import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {ToastService} from "../../services/toast.service";
import {ToastType} from "../../enum/toast-type";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  ionicForm: FormGroup; // Angular Reactive Forms FormGroup for the signup form

  constructor(
    private toast: ToastService,
    private loadingController: LoadingController,
    private authService: AuthenticationService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Initialize the form with validators for full name, email, and password
    this.ionicForm = this.formBuilder.group({
      fullname: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
    });
  }

  // Async function to perform user registration
  async signUp() {
    const loading = await this.loadingController.create();

    if (this.ionicForm.valid) {
      await loading.present();
      const email = this.ionicForm.value.email;
      const password = this.ionicForm.value.password;
      const fullname = this.ionicForm.value.fullname;

      // Call the authentication service to register the user
      this.authService.registerUser(email, password, fullname).then(() => {
        loading.dismiss();
        // Show success toaster, welcome the user, and navigate to the ads page
        this.toast.toaster("Welcome " + fullname, ToastType.SUCCESS.toString());
        this.router.navigate(['/ad']);
      }).catch((err) => {
        loading.dismiss();
        console.log(err);

        // Extract and format the error message for better display
        let errorMsg = err.message
          .substring(err.message.indexOf("(auth/")) // e.g., (auth/invalid-credentials).
          .replace(/\(auth\//, '')  // Replace (auth/
          .replace(/\)/, '')        // Replace )
          .replace(/-/g, ' ')      // Replace -
          .replace(/\./g, ' ');      // Replace .

        // Show error toaster with the formatted error message
        this.toast.toaster(errorMsg, ToastType.WARNING.toString());
      });
    } else {
      // Show error toaster if form validation fails
      await this.toast.toaster("Please provide all the required values", ToastType.DANGER.toString());
    }
  }
}
