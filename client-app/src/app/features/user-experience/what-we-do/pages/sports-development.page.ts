import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NewsletterPage } from '../../correspondence/pages/newsletter.page';
import { FixedSocialPluginComponent } from '../../~common/components/fixed-social-plugin/fixed-social-plugin.component';
import { SocialPluginComponent } from '../../~common/components/social-plugin/social-plugin.component';
import { CanonicalService } from '../../../../core/services/canonical.service';
import { SITE_URL } from '../../../../core/tokens/api-config-url.tokens';

@Component({
  selector: 'app-sports-development',
  standalone: true,
  imports: [CommonModule, RouterLink, SocialPluginComponent, NewsletterPage, FixedSocialPluginComponent],
  templateUrl: './sports-development.page.html',
  styleUrls: ['./sports-development.page.scss']
})
export class SportsDevelopmentPage {
  private title = inject(Title);
  private meta = inject(Meta);
  private canonical = inject(CanonicalService);
  private siteUrl = inject(SITE_URL);
  

  schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.varsityacademy.com/" },
          { "@type": "ListItem", "position": 2, "name": "Sports Development", "item": "https://www.varsityacademy.com/en/what-we-do/sports-development" }
        ]
      },
      {
        "@type": "ItemList",
        "name": "VSA Prep Sports Development Programs",
        "itemListElement": [
          {
            "@type": "Course",
            "name": "Basketball Development",
            "description": "Ball handling, shooting mechanics, defensive IQ, and team strategy."
          },
          {
            "@type": "Course",
            "name": "Soccer Development",
            "description": "Technical footwork, game intelligence, positional play, conditioning."
          },
          {
            "@type": "Course",
            "name": "Volleyball Development",
            "description": "Serving, setting, blocking, power hitting, court awareness."
          },
          {
            "@type": "Course",
            "name": "Track & Field Training",
            "description": "Sprint mechanics, agility, endurance, explosive strength."
          }
        ]
      }
    ]
  };

  ngOnInit(): void {
    const url = `${this.siteUrl}/en/sports-development`;
    const pageTitle = 'Sports Development | Varsity Sports Academy Prep';
    const pageDescription ='Multi-sport athlete development at Varsity Sports Academy Prep: basketball, soccer, volleyball, and track with strength, speed, agility, and NCAA-aligned pathways.';
    const pageKeywords = 'sports development, youth athlete training, basketball training, soccer training, volleyball training, speed and agility, strength and conditioning, Barbados, NCAA preparation, athletic scholarships';
    
    this.title.setTitle(pageTitle);
    this.meta.addTags([
      { name: 'description', content: pageDescription },
      { name: 'keywords', content: pageKeywords },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content:  pageDescription},
      { property: 'og:type', content: 'website' }
    ]);
    this.canonical.setCanonical(url);
  }
}
