import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  // Async function to display a toast message with the provided content and type
  async toaster(message: string, type: string) {
    const toast = await this.toastController.create({
      message: message,     // Message to be displayed in the toast
      color: type,          // Type of toast (success, danger, etc.)
      duration: 1500,       // Duration for which the toast is visible (in milliseconds)
      position: 'bottom'    // Position on the screen where the toast will appear
    });

    await toast.present();        // Display the toast
  }
}
