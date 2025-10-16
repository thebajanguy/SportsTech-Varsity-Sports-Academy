import { Routes } from '@angular/router';
import { seoResolve } from '../../../core/resolvers/seo.resolver';

export const CORRESPONDENCE_ROUTES: Routes = [
  { // Consultation
      path: 'consultation',
      loadComponent: () =>
        import('./pages/consultation.page').then(m => m.ConsultationPage),
          resolve: { seo: seoResolve({
            title: 'Free Consultation | Varsity Sports Academy Prep | Academic & Athletic Training Support | Request a Meeting',
            description: 'Book a free consultation with Varsity Sports Academy Prep. Discuss academics, training, scholarships, and next steps for your student-athlete.',
            canonical: 'https://www.varsitysportsacademy.com/en/academics-and-sports/consultation',
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
  },
  { // Contact
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact.page').then(m => m.ContactPage),
        resolve: { seo: seoResolve({
          title: 'Contact Varsity Sports Academy Prep | Academic & Athletic Training Support',
          description: 'Get in touch with Varsity Sports Academy Prep to learn about academic tutoring, athletic training, scholarships, and group rates. Contact us today to start your student-athlete journey.',
          canonical: 'https://www.varsitysportsacademy.com/en/academics-and-sports/contact',
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