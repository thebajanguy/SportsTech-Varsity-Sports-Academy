// registration-form.component.ts
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { RegistrationApi, SPORT_OPTIONS, SKILL_LEVEL_OPTIONS, TSHIRT_SIZE_OPTIONS, CampRegistrationPayload } from '../../apis/registration.api';
import { CampsService } from '../../apis/camp.api';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-registration-form',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, RouterModule, DatePipe,
    ReactiveFormsModule,   // ✅ REQUIRED
    NgxMaskDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private reg = inject(RegistrationApi);
  private campsSvc = inject(CampsService);  

  submitting = signal(false);
  success = signal(false);
  errorMsg = signal<string | null>(null);

  sports = SPORT_OPTIONS;
  skills = SKILL_LEVEL_OPTIONS;
  sizes = TSHIRT_SIZE_OPTIONS;

  form: FormGroup = this.fb.group({
    activityId: this.fb.control('', { validators: [Validators.required] }),
    sport: this.fb.control(this.sports[0], { validators: [Validators.required] }),
    player: this.fb.group({
      firstName: this.fb.control('', { validators: [Validators.required, Validators.maxLength(60)] }),
      lastName: this.fb.control('', { validators: [Validators.required, Validators.maxLength(60)] }),
      dob: this.fb.control('', { validators: [Validators.required, this.isoDateValidator] }),
      email: this.fb.control<string | null>(null, { validators: [Validators.email] }),
      phone: this.fb.control<string | null>(null),
      school: this.fb.control<string | null>(null),
      gradeOrForm: this.fb.control('', { validators: [Validators.required] }),
      position: this.fb.control('', { validators: [Validators.required] }),
      skillLevel: this.fb.control(this.skills[0], { validators: [Validators.required] }),
      tshirtSize: this.fb.control(this.sizes[0], { validators: [Validators.required] }),
    }),
    guardian: this.fb.group({
      name: this.fb.control('', { validators: [Validators.required] }),
      email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
      phone: this.fb.control('', { validators: [Validators.required] }),
      relation: this.fb.control('', { validators: [Validators.required] }),
    }),
    notes: this.fb.control<string | null>(null),
  });

  get f() { return this.form.controls; }
  get p() { return (this.form.get('player') as FormGroup).controls; }
  get g() { return (this.form.get('guardian') as FormGroup).controls; }
  
  // registration-form.component.ts
  private digitsOnly(s?: string | null) { return (s ?? '').replace(/\D+/g, '') || null; }


  // Validates pattern AND real calendar date (handles leap years)
  private isoDateValidator(c: AbstractControl): ValidationErrors | null {
    const v = (c.value ?? '').toString().trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return { isoDate: 'Use YYYY-MM-DD' };

    const [y, m, d] = v.split('-').map(Number);
    if (m < 1 || m > 12) return { isoDate: 'Invalid month' };
    const daysInMonth = new Date(y, m, 0).getDate(); // 0 = last day of prev month
    if (d < 1 || d > daysInMonth) return { isoDate: 'Invalid day' };
    return null;
  }

  async submit() {
    this.errorMsg.set(null);
    this.success.set(false);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;

    const cleanPhonePlayer = this.digitsOnly(v.player!.phone);
    const cleanPhoneGuardian = this.digitsOnly(v.guardian!.phone);

    const payload: CampRegistrationPayload = {
      campId: v.activityId!, sport: v.sport!,
      player: {
        firstName: v.player!.firstName!, lastName: v.player!.lastName!,
        dob: v.player!.dob!, email: v.player!.email ?? null, phone: cleanPhonePlayer ?? null,
        school: v.player!.school ?? null, gradeOrForm: v.player!.gradeOrForm!,
        position: v.player!.position!, skillLevel: v.player!.skillLevel!, tshirtSize: v.player!.tshirtSize!,
      },
      guardian: {
        name: v.guardian!.name!, email: v.guardian!.email!,
        phone: cleanPhoneGuardian!, relation: v.guardian!.relation!,
      },
      notes: v.notes ?? null,
      createdAt: new Date().toISOString(),
    };

    try {
      this.submitting.set(true);
      await this.reg.createCampRegistration(payload).toPromise();
      this.success.set(true);
      this.form.reset({
        sport: this.sports[0],
        player: { skillLevel: this.skills[0], tshirtSize: this.sizes[0] }
      });
    } catch (err: any) {
      this.errorMsg.set(err?.error?.message ?? 'Could not submit registration. Please try again.');
    } finally {
      this.submitting.set(false);
    }
  }
}

