import { Routes } from '@angular/router';
import { seoResolve } from '../../../core/resolvers/seo.resolver';

export const PROGRAMS_ROUTES: Routes = [
  {// Programs page
    path: 'programs',
    loadComponent: () => import('./pages/programs-landing.page')
      .then(m => m.ProgramsLandingPage),
        resolve: { seo: seoResolve({
          title: 'Brains & Ballers Academics & Sports Programa | Varsity Sports Academy',
          description: 'Join the Brains & Ballers Academics and Sports Program at Varsity Sports Academy Prep for academic support and athletic training.',
          keywords: 'after school programa, aports camps, academic supporta, athletic training, youth sports, Barbados',
          canonical: 'https://www.varsitysportsacademy.com/en/academics-and-sports/programs/',
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
  {// Aftershool
    path: 'after-school',
    loadComponent: () =>
      import('./pages/after-school.page')
        .then(m => m.AfterSchoolPage),
      resolve: { seo: seoResolve({
        title: 'Brains & Ballers After-School Programs | Varsity Sports Academy Prep',
        description: 'Daily homework support, CSEC/CAPE/SAT prep, and sport-specific training—built for student-athletes to improve grades and performance.',
        keywords: 'after school program, academic support, athletic training, youth sports, Barbados',
        canonical: 'https://www.varsitysportsacademy.com/en/academics-and-sports/after-school',
        robots: 'index,follow',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'EducationalOccupationalProgram',
          'name': 'Brains & Ballers After-School Programs',
          'provider': { '@type': 'Organization', 'name': 'Varsity Sports Academy Prep' },
          'timeOfDay': 'Afternoon',
          'audience': { '@type': 'EducationalAudience', 'educationalRole': 'Student' },
          'hasCourse': [
            { '@type': 'Course', 'name': 'Homework Support & Study Skills' },
            { '@type': 'Course', 'name': 'CSEC/CAPE & SAT/ACT Prep' },
            { '@type': 'Course', 'name': 'Sports Skills, Speed & Agility' }
          ],
          'areaServed': 'BB'
        }
    })}
  },
  {// Gold Camps - Basketball
    path: 'basketball-gold-camps',
    loadComponent: () => import('./pages/gold-camps-basketball.page')
      .then(m => m.GoldCampsBasketballPage),
        resolve: { seo: seoResolve({
          title: 'Brains & Ballers Basketball Gold Camps | Varsity Sports Academy Prep',
          description: 'Elite basketball skill, IQ, and leadership camp for student-athletes.',
          keywords: 'after school program, academic support, athletic training, youth sports, Barbados',
          canonical: 'https://www.varsitysportsacademy.com/en/academics-and-sports/basketball-gold-camps',
          robots: 'index,follow',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': 'Brains & Ballers Basketball Gold Camps',
            'serviceType': 'Educational Program',
            'provider': { '@type': 'EducationalOrganization', 'name': 'Varsity Sports Academy Prep' },
            'areaServed': 'BB'
          }
      })}
  },
  {// Gold Camps - Soccer
    path: 'soccer-gold-camps',
    loadComponent: () => import('./pages/gold-camps-soccer.page')
      .then(m => m.GoldCampsSoccerPage),
        resolve: { seo: seoResolve({
          title: 'Brains & Ballers Soccer Gold Camps | Varsity Sports Academy Prep',
          description: 'Advanced soccer training, fitness, and showcase experience for student-athletes.',
          keywords: 'after school program, academic support, athletic training, youth sports, Barbados',
          canonical: 'https://www.varsitysportsacademy.com/n/academics-and-sports/soccer-gold-camps',
          robots: 'index,follow',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': 'Brains & Ballers Soccer Gold Camps',
            'serviceType': 'Educational Program',
            'provider': { '@type': 'EducationalOrganization', 'name': 'Varsity Sports Academy Prep' },
            'areaServed': 'BB'
          }
      })}
  }
];