import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

import { RouterLink } from '@angular/router';
import { SocialPluginComponent } from '../../~common/components/social-plugin/social-plugin.component';
import { FixedSocialPluginComponent } from "../../~common/components/fixed-social-plugin/fixed-social-plugin.component";
import { NewsletterPage } from '../../correspondence/pages/newsletter.page';


@Component({
  selector: 'app-ncaa-compliance',
  standalone: true,
  imports: [CommonModule, RouterLink, SocialPluginComponent, NewsletterPage, FixedSocialPluginComponent],
  templateUrl: './ncaa-compliance.page.html',
  styleUrls: ['./ncaa-compliance.page.scss']
})
export class NcaaCompliancePage {
  private title = inject(Title);
  private meta = inject(Meta);

  // JSON-LD for FAQ + Breadcrumb
  schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.yoursite.com/" },
          { "@type": "ListItem", "position": 2, "name": "NCAA Compliance & Eligibility Support", "item": "https://www.yoursite.com/ncaa-compliance" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the NCAA 16 core courses?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "4 English, 3 Math (Algebra I or higher), 2 Science (1 lab), 1 additional English/Math/Science, 2 Social Science, 4 additional core (e.g., Foreign Language, Philosophy)."
            }
          },
          {
            "@type": "Question",
            "name": "How does the NCAA sliding scale work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It balances core GPA with standardized test scores. Higher GPA requires a lower test score and vice versa."
            }
          },
          {
            "@type": "Question",
            "name": "What can affect my amateur status?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Accepting pay beyond expenses, signing with agents, or competing with/against professionals can jeopardize eligibility."
            }
          },
          {
            "@type": "Question",
            "name": "Which documents must I send to the NCAA Eligibility Center?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Registration, official transcripts, verified test scores, proof of graduation, and amateurism questionnaires."
            }
          }
        ]
      }
    ]
  };

  ngOnInit(): void {
    const pageTitle = 'NCAA Compliance & Eligibility Support | Varsity Sports Academy Prep';
    this.title.setTitle(pageTitle);

    this.meta.addTags([
      { name: 'description', content: 'Get step-by-step NCAA eligibility guidance: 16-core course mapping, GPA sliding scale, amateurism rules, official documentation, timelines, and common mistakes to avoid.' },
      { name: 'keywords', content: 'NCAA eligibility, 16 core courses, sliding scale, amateurism, transfers, transcripts, SAT ACT, Caribbean CSEC CAPE mapping' },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: 'NCAA compliance help for student-athletes: academics, documentation, and timelines—done right.' },
      { property: 'og:type', content: 'article' }
    ]);

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('vsa-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('vsa-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
}
