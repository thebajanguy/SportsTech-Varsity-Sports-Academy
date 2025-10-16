import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { BasePageComponent } from '../../../../core/directives/base-page.directive';
import { BaseHeroComponent } from "../../~common/components/base-hero/base-hero.component";
import { RegistrationIntakeComponent  } from '../components/registration-intake/registration-intake.component';
import { NewsletterPage } from '../../correspondence/components/newsletter.component';
import { FixedSocialPluginComponent } from "../../~common/components/fixed-social-plugin/fixed-social-plugin.component";


@Component({
  selector: 'app-after-school-registration',
  standalone: true,

  imports: [
    CommonModule, RouterLink, RegistrationIntakeComponent, BaseHeroComponent, NewsletterPage, FixedSocialPluginComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './after-school-registration.page.html',
  styleUrl: './after-school-registration.page.scss',
})
export class AfterSchoolRegistrationPage extends BasePageComponent implements OnInit  {
  override pageName = 'vsa-page';

  description = `
  Our Brains & Ballers After School Program delivers high-intensity academic and sports training focused on ncaa 16 core subjects, sports skill mastery, game IQ development, and leadership growth. 
  `.trim();  

  highlights = [
    'NCAA Eligibility Guidance (core courses, GPA, SAT/ACT, recruiting rules)',
    'Advanced skill labs + position-specific coaching',
    'IQ & film breakdowns, leadership & conflict resolution',
    'Speed, Strength, Agility & Fitness Development',
    'Sport-Specific Position Coaching',
    'Conflict Resolution & Leadership Workshops'
  ];

  activityType: 'Basketball-Camp' | 'Soccer-Camp' | 'After-School-Program' = 'After-School-Program';
  interest: 'Basketball' | 'Soccer' | 'After-School' = 'After-School';
  country: 'Barbados' | 'United States' = 'Barbados';
  
}


