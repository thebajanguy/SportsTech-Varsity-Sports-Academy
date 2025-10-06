// app.routes.ts
import { Routes, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

import { languageCanMatch } from '../core/guards/language.guard';
import { seoResolve } from '../core/resolvers/seo.resolver';

import { UserExperienceLayout } from '../features/user-experience/~layout/user-experience.layout';

export const DEFAULT_LANG = 'en';
export const SUPPORTED_LANGS = ['en', 'es', 'fr'] as const;

const routes: Routes = [
  // Localized shell
  {
    //path: ':lang',
    path: `${DEFAULT_LANG}/academics-and-sports`,
    component: UserExperienceLayout,
    canMatch: [languageCanMatch(SUPPORTED_LANGS, DEFAULT_LANG)],
    children: [
      { // Main landing page
        path: 'student-athletes',
        loadComponent: () =>
          import('../features/user-experience/home/pages/home.page')
          .then(m => m.HomePage),
            resolve: { seo: seoResolve({
              title: 'Home | Varsity Sports Academy | Academic Tutoring & Elite Sports Training for Student-Athletes',
              description: 'Varsity Sports Academy Prep in Barbados combines academic tutoring, basketball, soccer & volleyball training, and NCAA recruiting guidance to help student-athletes earn scholarships.',
              canonical: 'https://www.varsitysportsacademy.com/en/sports-and-academic-prep',
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
      {
        path: 'sports-academics-prep',
        loadComponent: () =>
          import('../features/user-experience/who-we-are/pages/who-we-are.page')
          .then(m => m.WhoWeArePage),
            resolve: { seo: seoResolve({
              title: 'Who We Are | Varsity Sports Academy Prep',
              description: 'Learn about our mission: academics + elite sports training + NCAA readiness.',
              canonical: 'https://www.varsitysportsacademy.com/en/about',
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
      {
        path: 'approach',
        loadComponent: () =>
          import('../features/user-experience/approach/pages/approach.page')
          .then(m => m.ApproachPage),
            resolve: { seo: seoResolve({
              title: 'Our Approach | Varsity Sports Academy Prep | Academic & Athletic Training Support | Request a Meeting',
              description: 'The h Varsity Sports Academy Prep is what drives our culture. Discuss academics, training, scholarships, and next steps for your student-athlete.',
              canonical: 'https://www.varsitysportsacademy.com/en/student-athletes/approach',
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
      // What We do / Services
      { 
        path: 'academic-tutoring',
        loadComponent: () => import('../features/user-experience/what-we-do/pages/academic-tutoring.page')
          .then(m => m.AcademicTutoringPage),
            resolve: { seo: seoResolve({
              title: 'Academic Tutoring for Student-Athletes | Varsity Sports Academy Prep',
              description: 'One-to-one and group tutoring for student-athletes in core subjects, study skills, and SAT/ACT/CSEC/CAPE test prep. Support for NCAA 16-core eligibility.',
              keywords: 'high school sports development, youth athlete training, basketball training, soccer training, volleyball training, speed and agility, strength and conditioning, Barbados, NCAA preparation, athletic scholarships',
              canonical: 'https://www.varsitysportsacademy.com/en/what-we-do/academic-tutoring',
              jsonLd: {
                '@context': 'https://schema.org',
                '@type': 'Service',
                'name': 'Academic Tutoring for Student-Athletes',
                'serviceType': 'Education Tutoring',
                'areaServed': 'BB',
                'provider': { '@type': 'EducationalOrganization', 'name': 'Varsity Sports Academy Prep' }
              }
            }) }
      },
      {
        path: 'ncaa-compliance',
        loadComponent: () => import('../features/user-experience/what-we-do/pages/ncaa-compliance.page')
          .then(m => m.NcaaCompliancePage),
            resolve: { seo: seoResolve({
              title: 'NCAA Compliance & Academic Support Guidance | Varsity Sports Academy Prep',
              description: 'Get help with NCAA 16-core course mappings, GPA & sliding scale, amateurism certification, eligibility timelines, transcripts, and recruiting rules for student-athletes.',
              keywords: 'high school sports development, youth athlete training, basketball training, soccer training, volleyball training, speed and agility, strength and conditioning, Barbados, NCAA preparation, athletic scholarships',
              canonical: 'https://www.varsitysportsacademy.com/en/what-we-do/ncaa-compliance',
              jsonLd: {
                '@context': 'https://schema.org',
                '@type': 'Service',
                'name': 'NCAA Compliance Guidance',
                'serviceType': 'Eligibility Advisory',
                'provider': { '@type': 'EducationalOrganization', 'name': 'Varsity Sports Academy Prep' },
                'areaServed': 'BB'
              }
            })}
      },
      { // Sports
        path: 'sports-development',
        loadComponent: () =>
          import('../features/user-experience/what-we-do/pages/sports-development.page')
            .then(m => m.SportsDevelopmentPage),
              resolve: { seo: seoResolve({
                title: 'Sports Development | Varsity Sports Academy Prep',
                description: 'Skill development, speed & agility, strength & conditioning, and injury prevention for student-athletes.',
                keywords: 'high school sports development, youth athlete training, basketball training, soccer training, volleyball training, speed and agility, strength and conditioning, Barbados, NCAA preparation, athletic scholarships',
                canonical: 'https://www.varsitysportsacademy.com/en/academics-and-sports/sports-development',
                jsonLd: {
                  '@context': 'https://schema.org',
                  '@type': 'Service',
                  'name': 'Sports Development & Performance Training',
                  'serviceType': 'Athletic Training',
                  'areaServed': 'BB',
                  'provider': { '@type': 'EducationalOrganization', 'name': 'Varsity Sports Academy Prep' }
                }
              }) }
      },
      {
        path: 'recruitment-exposure',
        loadComponent: () => import('../features/user-experience/what-we-do/pages/recruitment-exposure.page')
          .then(m => m.RecruitmentAndExposurePage),
            resolve: { seo: seoResolve({
              title: 'Athlete Recruitment & Exposure Strategy | Varsity Sports Academy Prep',
              description: 'Get recruited with Varsity Sports Academy Prep’s strategy: athlete profiles, highlights, showcase events, coach outreach, social media best practices, and scholarship negotiation support.',
              keywords: 'high school sports development, youth athlete training, basketball training, soccer training, volleyball training, speed and agility, strength and conditioning, Barbados, NCAA preparation, athletic scholarships',
              canonical: 'https://www.varsitysportsacademy.com/en/what-we-do/recruitment-exposure',
              robots: 'index,follow',
              jsonLd: {
                '@context': 'https://schema.org',
                '@type': 'Service',
                'name': 'Athlete Recruitment & Exposure',
                'serviceType': 'Recruiting Advisory',
                'provider': { '@type': 'EducationalOrganization', 'name': 'Varsity Sports Academy Prep' },
                'areaServed': 'BB'
              }
          })}
      },
      // Correspondence
      {
          path: 'consultation',
          loadComponent: () =>
            import('../features/user-experience/correspondence/pages/consultation.page').then(m => m.ConsultationPage),
              resolve: { seo: seoResolve({
                title: 'Free Consultation | Varsity Sports Academy Prep | Academic & Athletic Training Support | Request a Meeting',
                description: 'Book a free consultation with Varsity Sports Academy Prep. Discuss academics, training, scholarships, and next steps for your student-athlete.',
                canonical: 'https://www.varsitysportsacademy.com/en/consultation',
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
      {
        path: 'contact',
        loadComponent: () =>
          import('../features/user-experience/correspondence/pages/contact.page').then(m => m.ContactPage),
            resolve: { seo: seoResolve({
              title: 'Contact Varsity Sports Academy Prep | Academic & Athletic Training Support',
              description: 'Get in touch with Varsity Sports Academy Prep to learn about academic tutoring, athletic training, scholarships, and group rates. Contact us today to start your student-athlete journey.',
              canonical: 'https://www.varsitysportsacademy.com/en/contact',
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

    ]
  },

  { path: '',   redirectTo: `${DEFAULT_LANG}/academics-and-sports/student-athletes`, pathMatch: 'full', },
  { path: '**', redirectTo: `${DEFAULT_LANG}/academics-and-sports/student-athletes`, pathMatch: 'full', },

];

export const ROUTER_PROVIDERS = [
  provideRouter(routes,
    withInMemoryScrolling({ 
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    }),
    withPreloading(PreloadAllModules) // faster perceived loads
  )

];


