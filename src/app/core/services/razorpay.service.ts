import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  constructor(
    private loaderService: LoaderService,
    private snackBar: MatSnackBar
  ) {}

  openPaymentGateway(pg: any, onSuccess: (response: any) => void): void {
    this.loaderService.show(); // Start spinner

    try {
      const options: any = {
        key: 'rzp_test_YourKeyHere', // ✅ Replace with actual key
        amount: pg.price * 100,
        currency: 'INR',
        name: pg.name,
        description: 'PG Booking Payment',
        image: 'https://logo-url.com/logo.png',
        prefill: {
          name: 'Ajay Jat',
          email: 'ajay@example.com',
          contact: '9999999999'
        },
        notes: {
          address: 'Indore, MP'
        },
        theme: {
          color: '#1976d2'
        },
        handler: (response: any) => {
          this.loaderService.hide();
          this.snackBar.open('✅ Payment Successful!', 'Close', { duration: 3000 });
          onSuccess(response);
        },
        modal: {
          ondismiss: () => {
            this.loaderService.hide();
            this.snackBar.open('❌ Payment cancelled by user.', 'Close', { duration: 3000 });
          }
        }
      };

      const rzp = new Razorpay(options);

      // ✅ Handle payment failure
      rzp.on('payment.failed', (response: any) => {
        setTimeout(() => {
          this.loaderService.hide();
          this.snackBar.open('❌ Payment Failed. Please try again.', 'Close', { duration: 3000 });
          console.error('Payment Failed:', response.error);
        }, 250); // ⏳ Reduced delay
      });

      // ✅ Optional: Handle Razorpay internal errors
      rzp.on('payment.error', (error: any) => {
        setTimeout(() => {
          this.loaderService.hide();
          this.snackBar.open('⚠️ Razorpay Error. Try again.', 'Close', { duration: 3000 });
          console.error('Razorpay Error Event:', error);
        }, 250);
      });

      rzp.open(); // 🔓 Open Razorpay modal

      // 🛡️ Failsafe: Auto hide spinner after 30 seconds if Razorpay hangs
      setTimeout(() => {
        this.loaderService.hide();
      }, 30000);

    } catch (err) {
      this.loaderService.hide();
      this.snackBar.open('⚠️ Something went wrong. Try again later.', 'Close', { duration: 3000 });
      console.error('Exception while opening Razorpay:', err);
    }
  }
}
