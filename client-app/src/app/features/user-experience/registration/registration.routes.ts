// registration.routes.ts (standalone routing)
import { Routes } from '@angular/router';
import { seoResolve } from '../../../core/resolvers/seo.resolver';

export const REGISTRATION_ROUTES: Routes = [
  {// Camp Registration page
    path: 'camp-registration',
    loadComponent: () => import('./pages/camp-registration.page')
      .then(m => m.CampRegistrationPage),
        resolve: { seo: seoResolve({
          title: 'Brains & Ballers Academics & Sports Programa | Varsity Sports Academy',
          description: 'Join the Brains & Ballers Academics and Sports Program at Varsity Sports Academy Prep for academic support and athletic training.',
          keywords: 'after school programa, aports camps, academic supporta, athletic training, youth sports, Barbados',
          canonical: 'https://www.varsitysportsacademy.com/en/academics-and-sports/camp-registration/',
          robots: 'index,follow',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': 'Brains & Ballers Academics and Sports Programs',
            'serviceType': 'Educational Program',
            'provider': { '@type': 'EducationalOrganization', 'name': 'Varsity Sports Academy Prep' },
            'areaServed': 'BB'
          }
      })}
  },
  {// Camp Registration page
    path: 'after-school-registration',
    loadComponent: () => import('./pages/after-school-registration.page')
      .then(m => m.AfterSchoolRegistrationPage),
        resolve: { seo: seoResolve({
          title: 'Brains & Ballers Academics & Sports Programa | Varsity Sports Academy',
          description: 'Join the Brains & Ballers Academics and Sports Program at Varsity Sports Academy Prep for academic support and athletic training.',
          keywords: 'after school programa, aports camps, academic supporta, athletic training, youth sports, Barbados',
          canonical: 'https://www.varsitysportsacademy.com/en/academics-and-sports/after-school-registration/',
          robots: 'index,follow',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': 'Brains & Ballers Academics and Sports Programs',
            'serviceType': 'Educational Program',
            'provider': { '@type': 'EducationalOrganization', 'name': 'Varsity Sports Academy Prep' },
            'areaServed': 'BB'
          }
      })}
  }
];

