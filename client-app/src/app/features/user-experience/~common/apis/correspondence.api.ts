// src/app/services/information.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CORRESPONDENCE_API_BASE_URL } from '../../../../core/tokens/api-config-url.tokens';

// A strongly-typed union you can extend as needed
export const INTEREST_OPTIONS = ['Academics', 'Athletics', 'Sports Program', 'Camps', 'Scholarships', 'Coaching', 'Sponsorship', 'Volunteer', 'Media', 'Other'] as const;
export const COUNTRY_OPTIONS  = ['Barbados','United States','Other'] as const;

export type CountryOption  = typeof COUNTRY_OPTIONS[number];
export type InterestOption = typeof INTEREST_OPTIONS[number];

export interface CorrespondenceDto{
  CorrespondenceType?: string | null;
  ApplicationName?: string | null;
  Fullname?: string | null;
  GivenName?: string | null;
  Surname?: string | null;
  Email?: string | null;
  Phone?: string | null;
  Country?: string | null;
  Interest?: string | null;
  Message?: string | null;
  Day?: string | null;
  Time?: string | null;
  Year?: string | null;
  Honeypot?: string | null; // anti-bot hidden input
};


@Injectable({ providedIn: 'root' })
export class CorrespondenceApi {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(CORRESPONDENCE_API_BASE_URL);

  CreateContactRequest(payload: CorrespondenceDto): Observable<void> {
    return this.http.post<void>(`${this.apiBaseUrl}/correspondences/contact`, payload);
  }

  CreateNewsletterSignup(payload: CorrespondenceDto): Observable<void> {
    return this.http.post<void>(`${this.apiBaseUrl}/correspondences/newsletter`, payload);
  }

  CreateConsultationRequest(payload: CorrespondenceDto): Observable<void> {
    return this.http.post<void>(`${this.apiBaseUrl}/correspondences/consultation`, payload);
  }

}

