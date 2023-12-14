import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {ToastService} from "../../services/toast.service";
import {ToastType} from "../../enum/toast-type";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup; // Angular Reactive Forms FormGroup for the login form

  constructor(
    private toast: ToastService,
    private loadingController: LoadingController,
    private authService: AuthenticationService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Initialize the form with validators for email and password
    this.ionicForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]],
      password: ['', [
        Validators.required,
      ]],
    });
  }

  // Async function to perform login
  async login() {
    const loading = await this.loadingController.create();

    if (this.ionicForm.valid) {
      await loading.present();
      const email = this.ionicForm.value.email;
      const password = this.ionicForm.value.password;

      // Call the authentication service to log in the user
      this.authService.loginUser(email, password).then((res) => {
        loading.dismiss();
        let name = res.user.displayName;

        // Save the UUID in local storage
        localStorage.setItem('uid', res.user.uid);

        // Display toaster with a welcome message
        this.toast.toaster(`Welcome home ${name != null ? name : res.user.email}`, ToastType.SUCCESS.toString());

        // Redirect the user to the ads page
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

        // Display toaster with the formatted error message
        this.toast.toaster(errorMsg, ToastType.WARNING.toString());
      });
    } else {
      await this.toast.toaster("Please provide all the required values", ToastType.DANGER.toString());
    }
  }
}
