// options-and-service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REGISTRATION_API_BASE_URL } from '../../../../core/tokens/api-config-url.tokens';

// ✅ Options
export const SPORT_OPTIONS = ['Basketball', 'Soccer', 'Other'] as const;
export type SportOption = typeof SPORT_OPTIONS[number];

export const SKILL_LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'] as const;
export type SkillLevelOption = typeof SKILL_LEVEL_OPTIONS[number];

export const TSHIRT_SIZE_OPTIONS = ['YS', 'YM', 'YL', 'S', 'M', 'L', 'XL'] as const;
export type TShirtSizeOption = typeof TSHIRT_SIZE_OPTIONS[number]; // ✅ (was wrong)

export const PAYMENT_METHOD_OPTIONS = ['Stripe', 'Cash', 'FirstPay', 'BankTransfer'] as const;
export type PaymentMethodOption = typeof PAYMENT_METHOD_OPTIONS[number]; // ✅ (was wrong)

export const PAYMENT_STATUS_OPTIONS = ['Pending', 'Completed', 'Failed'] as const;
export type PaymentStatusOption = typeof PAYMENT_STATUS_OPTIONS[number]; // ✅ (was wrong)

// ✅ Payload
export interface CampRegistrationPayload {
  campId: string | null;// campId or afterSchoolId
  sport: string | null;// keep flexible, but prefer SportOption
  player: {
    firstName?: string | null;
    lastName?: string | null;
    dob?: string | null;// 'YYYY-MM-DD' preferred
    email?: string | null;
    phone?: string | null;
    school?: string | null;
    gradeOrForm?: string | null;
    position?: string | null;
    skillLevel?: string | null;
    tshirtSize?: string | null;
  };
  guardian?: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    relation?: string | null;
  };
  payment?: {
    method?: string | null;
    amount?: number | null;
    currency?: string | null;
    status?: string | null;
    transactionId?: string | null;
  };
  notes?: string | null;
  createdAt?: string | null;
  honeyPot?: string | null;
}

@Injectable({ providedIn: 'root' })
export class RegistrationApi {
  private http = inject(HttpClient);
  private readonly apiBaseUrl = inject(REGISTRATION_API_BASE_URL);

  /** Creates a registration, returns 204/201 (void payload). */
  createCampRegistration(payload: CampRegistrationPayload) {
    return this.http.post<void>(`${this.apiBaseUrl}/registrations/camp`, payload);
  }
}
