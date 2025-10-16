// what-we-do.routes.ts (standalone routing)
import { Routes } from '@angular/router';
import { seoResolve } from '../../../core/resolvers/seo.resolver';

export const APPROACH_ROUTES: Routes = [
  { // Our Approach
    path: 'approach',
    loadComponent: () =>
      import('./pages/approach.page')
      .then(m => m.ApproachPage),
        resolve: { seo: seoResolve({
          title: 'Our Approach | Varsity Sports Academy Prep — Academic & Athletic Development',
          description: 'Varsity Sports Academy Prep takes a full-cycle approach to youth development—combining academics, athletic training, data analytics, and mentorship to help student-athletes reach their full potential.',
          canonical: 'https://www.varsitysportsacademy.com/en/academics-and-sports/approach',
          keywords: 'Varsity Sports Academy, student athletes, youth sports training, academic tutoring, sports analytics, athlete development, AI performance tracking, Barbados sports academy',
          robots: 'index,follow',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            'name': 'Varsity Sports Academy Prep',
            'url': 'https://www.varsitysportsacademy.com/',
            'address': { '@type': 'PostalAddress', 'addressCountry': 'BB' },
            'sameAs': ['https://www.instagram.com/vsaprep']
          }
        })}
  }
];
