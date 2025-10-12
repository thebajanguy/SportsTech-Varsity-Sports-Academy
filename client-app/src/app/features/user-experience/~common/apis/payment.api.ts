// payment.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { loadStripe } from '@stripe/stripe-js'; // <- no Stripe type imported

//import { loadStripe, type Stripe as StripeJs } from '@stripe/stripe-js';


@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient);
  private stripePromise = loadStripe(environment.stripePk); // inferred type (Stripe | null)
  //private stripePromise: Promise<StripeJs | null> = loadStripe(environment.stripePk);

  async startCheckout(registrationId: string) {
    const stripe = await this.stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    const { sessionId } = await firstValueFrom(
      this.http.post<{ sessionId: string }>(`${environment.registrationApiBaseUrl}/pay/checkout`, { registrationId })
    );

    const { error } = await stripe.redirectToCheckout({ sessionId }); // now OK
    if (error) throw error;
  }
}
