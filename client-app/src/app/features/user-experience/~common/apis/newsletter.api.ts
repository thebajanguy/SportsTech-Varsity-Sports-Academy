import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CORRESPONDENCE_API_BASE_URL } from '../../../../core/tokens/api-config-url.tokens';


export const INTEREST_SPORT_OPTIONS = ['Sports Program','Athletic Program','Basketball','Soccer'] as const;
export const COUNTRY_OPTIONS  = ['Barbados','United States','Other'] as const;
export type InterestSportOption = typeof INTEREST_SPORT_OPTIONS[number];
export type CountryOption  = typeof COUNTRY_OPTIONS[number];

export type NewsletterDto = {
  fullName: string;
  email: string;
  country: CountryOption; 
  interestSport: InterestSportOption;  // stays strongly typed
};


@Injectable({ providedIn: 'root' })
export class NewsletterApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(CORRESPONDENCE_API_BASE_URL);

  subscribe(payload: NewsletterDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/correspondences/newsletter`, payload);
  }
}