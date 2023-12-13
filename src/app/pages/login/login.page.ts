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
  ionicForm: FormGroup;

  constructor(private toast: ToastService,
              private loadingController: LoadingController,
              private authService: AuthenticationService,
              private router: Router,
              public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [
          Validators.required,
        ]
      ],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    if (this.ionicForm.valid) {
      await loading.present();
      const email = this.ionicForm.value.email;
      const password = this.ionicForm.value.password;

      this.authService.loginUser(email, password).then((res) => {
        loading.dismiss();
        let name = res.user.displayName;
        // Save the uuid in local storage
        localStorage.setItem('uid', res.user.uid);
        // Display toaster
        this.toast.toaster(`welcome home ${name != null ? name : res.user.email}` , ToastType.SUCCESS.toString());
        // Redirect the user to ads page
        this.router.navigate(['/ad']);
      }).catch((err) => {
        loading.dismiss();
        console.log(err);
        let errorMsg = err.message
          .substring(err.message.indexOf("(auth/")) // e.g., (auth/invalid-credentials).
          .replace(/\(auth\//, '')  // Replace (auth/
          .replace(/\)/, '')        // Replace )
          .replace(/-/g, ' ')      // Replace -
          .replace(/\./g, ' ')      // Replace .

        this.toast.toaster(errorMsg, ToastType.WARNING.toString());
      });
    } else {
      this.toast.toaster("Please provide all the required values", ToastType.DANGER.toString());
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
}
