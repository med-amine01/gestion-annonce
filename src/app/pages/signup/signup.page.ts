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
  ionicForm: FormGroup;

  constructor(private toast: ToastService,
              private loadingController: LoadingController,
              private authService: AuthenticationService,
              private router: Router,
              public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      fullname: ['', [
        Validators.required
      ]
      ],
      contact: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
      ]
      ],
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
      ],
      password: ['', [
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.required,
      ],
      ],
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async signUp() {
    const loading = await this.loadingController.create();
    if (this.ionicForm.valid) {
      await loading.present();
      const email = this.ionicForm.value.email;
      const password = this.ionicForm.value.password;
      const fullname = this.ionicForm.value.fullname;
      this.authService.registerUser(email, password, fullname).then((res) => {
        loading.dismiss();
        this.toast.toaster("welcome home " + fullname, ToastType.SUCCESS.toString());
        this.router.navigate(['/home']);
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
}
