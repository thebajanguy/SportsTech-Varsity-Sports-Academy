import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NewsletterPage } from '../../correspondence/pages/newsletter.page';
import { FixedSocialPluginComponent } from '../../~common/components/fixed-social-plugin/fixed-social-plugin.component';
import { SocialPluginComponent } from '../../~common/components/social-plugin/social-plugin.component';

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

  schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.yoursite.com/" },
          { "@type": "ListItem", "position": 2, "name": "Sports Development", "item": "https://www.yoursite.com/sports-development" }
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
    const pageTitle = 'Sports Development | Varsity Sports Academy Prep';
    this.title.setTitle(pageTitle);

    this.meta.addTags([
      { name: 'description', content: 'Multi-sport athlete development at Varsity Sports Academy Prep: basketball, soccer, volleyball, and track with strength, speed, agility, and NCAA-aligned pathways.' },
      { name: 'keywords', content: 'sports development, youth athlete training, basketball training, soccer training, volleyball training, speed and agility, strength and conditioning, Barbados, NCAA preparation, athletic scholarships' },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: 'Elite coaching + performance training to unlock your full athletic potential.' },
      { property: 'og:type', content: 'website' }
    ]);
  }
}
