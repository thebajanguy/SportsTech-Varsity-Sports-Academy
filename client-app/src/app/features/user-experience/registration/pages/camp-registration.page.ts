import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { BasePageComponent } from '../../../../core/directives/base-page.directive';
import { BaseHeroComponent } from "../../~common/components/base-hero/base-hero.component";
import { RegistrationIntakeComponent  } from '../components/registration-intake/registration-intake.component';
import { NewsletterPage } from '../../correspondence/components/newsletter.component';
import { FixedSocialPluginComponent } from "../../~common/components/fixed-social-plugin/fixed-social-plugin.component";


@Component({
  selector: 'app-camp-registration',
  standalone: true,

  imports: [
    CommonModule, RouterLink, RegistrationIntakeComponent, BaseHeroComponent, NewsletterPage, FixedSocialPluginComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './camp-registration.page.html',
  styleUrl: './camp-registration.page.scss',
})
export class CampRegistrationPage extends BasePageComponent implements OnInit  {
  override pageName = 'vsa-page';
  description = `
  Our Brains & Ballers Gold Camps deliver high-intensity basketball training focused on skill mastery, game IQ development, and leadership growth. 
  `.trim();  

  highlights = [
    'Advanced skill labs + position-specific coaching',
    'IQ & film breakdowns, leadership & conflict resolution',
    'Speed, Strength, Agility & Fitness Development',
    'Sport-Specific Position Coaching',
    'NCAA Eligibility Guidance (core courses, GPA, SAT/ACT, recruiting rules)',
    'Conflict Resolution & Leadership Workshops',
    'Final day Live scrimmages and camp tournament'
  ];

  interest: 'Basketball' | 'Soccer' | 'After-School' = 'Basketball';
  activityType: 'Basketball-Camp' | 'Soccer-Camp' | 'After-School-Program' = 'Basketball-Camp';
  country: 'Barbados' | 'United States' = 'Barbados';
  
}


