import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class NewsletterInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only handle our newsletter endpoint
    if (req.url.endsWith('/api/correspondences/newsletter') && req.method === 'POST') {
      const { fullName, email, country, interest } = req.body ?? {};

      // Simple validations (server-side style)
      if (!fullName || !email || !country || !interest) {
        return throwError(() => new HttpErrorResponse({
          status: 400,
          statusText: 'Bad Request',
          url: req.url,
          error: { message: 'Missing required fields.' }
        }));
      }

      // Simulate success after a short delay
      return of(new HttpResponse<void>({ status: 200 })).pipe(delay(700));
    }

    // Pass through anything else
    return next.handle(req);
  }
}
